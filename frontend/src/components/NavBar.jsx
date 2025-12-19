import { useEffect, useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import {Home, BookOpen, BookMarked, Users, Contact, X, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth, useClerk, UserButton, useUser} from "@clerk/clerk-react";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Cursos", icon: BookOpen, href: "/cursos" },
  { name: "Sobre", icon: BookMarked, href: "/sobre" },
  { name: "Local", icon: Users, href: "/local" },
  { name: "Contato", icon: Contact, href: "/contato" },
];

const NavBar = () => {
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavBar, setShowNavbar] = useState(true);

  const menuRef = useRef(null);
  const isloggedIn = isSignedIn && Boolean(localStorage.getItem("token"));

   useEffect(() => {
    const loadToken = async () =>{
      if (isSignedIn) {
        const token = await getToken()
        localStorage.setItem("token" , token)
      }
    }
    loadToken()
   } , [isSignedIn, getToken])

   useEffect(() => {
      if (!isSignedIn) {
        localStorage.removeItem("token")
    }
   } , [isSignedIn])

     useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      console.log("Token removed instantly on Clerk logout event");
    };

    window.addEventListener("user:signed_out", handleLogout);
    return () => window.removeEventListener("user:signed_out", handleLogout);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const DesktopLinks = (estaAtivo) =>
    `${navbarStyles.desktopNavItem} ${
      estaAtivo ? navbarStyles.desktopNavItemActive : ""
    }`;
    
  const mobileLinks = (estaAtivo) =>
    `${navbarStyles.mobileMenuItem} ${
      estaAtivo
        ? navbarStyles.mobileMenuItemActive
        : navbarStyles.mobileMenuItemHover
    }`;

  return (
    <nav
      className={`${navbarStyles.navbar} ${
        showNavBar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
      } ${
        isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault
      }`}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* LOGO */}
          <div className="flex items-center gap-3 select-none">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div
              className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-700
             to-cyan-600 font-serif leading-[0.95]"
            >
              SkillForge
            </div>
          </div>
          {/* Desktop */}
          <div className={navbarStyles.desktopNav}>
            <div className={navbarStyles.desktopNavContainer}>
              {navItems.map((item) => {
                const Icone = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ estaAtivo }) => DesktopLinks(estaAtivo)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icone
                        size={16}
                        className={navbarStyles.desktopNavIcon}
                      />
                      <span className={navbarStyles.desktopNavText}>
                        {item.name}
                      </span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
          {/* lado Direito */}
          <div className={navbarStyles.authContainer}>
            {!isSignedIn ? (
              <button
                type="button"
                onClick={() => openSignUp({})}
                className={
                  navbarStyles.createAccountButton ?? navbarStyles.loginButton
                }
              >
                <span>Criar Conta</span>
              </button>
            ) : (
              <div className="flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
            {/* Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={navbarStyles.mobileMenuButton}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {/* Navbar mobile */}
        <div
          ref={menuRef}
          className={`${navbarStyles.mobileMenu} ${
            isOpen ? navbarStyles.mobileMenuOpen : navbarStyles.mobileMenuClosed
          }`}
        >
          <div className={navbarStyles.mobileMenuContainer}>
            <div className={navbarStyles.mobileMenuItems}>
              {navItems.map((item) => {
                const Icone = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ estaAtivo }) => mobileLinks(estaAtivo)}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={navbarStyles.mobileMenuIconContainer}>
                      <Icone
                        size={18}
                        className={navbarStyles.mobileMenuIcon}
                      />
                      <span className={navbarStyles.mobileMenuText}>
                        {item.name}
                      </span>
                    </div>
                  </NavLink>
                );
              })}
              {!isSignedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    openSignUp({});
                    setIsOpen(false);
                  }}
                  className={
                    navbarStyles.mobileCreateAccountButton ??
                    navbarStyles.mobileLoginButton
                  }
                >
                  <span>Criar Conta</span>
                </button>
              ) : (
                <div className="px-4 py-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
     <div className={navbarStyles.backgroundPattern}>
     <div className={navbarStyles.pattern}></div>
     </div>
    </nav>
  );
};

export default NavBar;
