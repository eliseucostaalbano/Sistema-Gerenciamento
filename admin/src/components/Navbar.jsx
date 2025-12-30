import{ useState, useEffect } from "react"
import { navbarStyles } from "../assets/dummyStyles"
import logo from "../assets/logo.png"
import { useLocation, Link } from "react-router-dom"
import { useRef } from "react"
import { LayoutDashboard, PlusCircle, ListChecks} from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const local = useLocation()
  const menuRef = useRef(null)

   const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
    {
      id: "addcourse",
      label: "Add Curso",
      icon: PlusCircle,
      path: "/addcurso",
    },
    {
      id: "listcourse",
      label: "Cursos Lista",
      icon: ListChecks,
      path: "/listacursos",
    },
    { id: "bookings", label: "Agendamentos", icon: ListChecks, path: "/agendamentos" },
  ];

    useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
   <nav className={navbarStyles.nav(isVisible)}>
    <div className={navbarStyles.navContainer}>
    <div ref={menuRef} className={navbarStyles.navInner(isMenuOpen)}>
      <div className={navbarStyles.glowEffect}></div>

       <div className={navbarStyles.navbarContent}>
        <div className={navbarStyles.logoContainer}>
          <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
          <div className="leading-[0.95]">
           <div className={navbarStyles.logoText}>
            SkillForge
           </div>
          </div>
          {/* desktop links */}
          <div className={navbarStyles.desktopNav}>
          <div className={navbarStyles.desktopNavInner}>
            {menuItems.map(({ id, label, icon: Icon, path }) => {
              const isActive = local.pathname === path;
              return (
                <Link key={id} to={path} className={navbarStyles.desktopNavItem(isActive)}>
                  <Icon className="w-4 h-4"/>
                  <span className=" lg:text-md xl:text-lg md:text-xs">
                    {label}
                  </span>
                  {isActive && (
                    <span className={navbarStyles.desktopActiveGlow} />
                  )}
                </Link>
              )
            })}
          </div>
          </div>
        </div>
       </div>
    </div>
    </div>
   </nav>
    </>
  )
}

export default Navbar