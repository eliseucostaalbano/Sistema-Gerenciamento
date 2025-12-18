import { useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import{Home, BookOpen, BookMarked, Users, Contact} from 'lucide-react';
import { NavLink } from "react-router-dom";

const navItems = [
  { nome: "Home", icone: Home, href: "/" },
  { nome: "Cursos", icone: BookOpen, href: "/cursos" },
  { nome: "Sobre", icone: BookMarked, href: "/sobre" },
  { nome: "Local", icone: Users, href: "/local" },
  { nome: "Contato", icone: Contact, href: "/contato" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavBar, setShowNavBar] = useState(true);

  const DesktopLinks = (estaAtivo) =>
  `${navbarStyles.desktopNavItem} ${
    estaAtivo ? navbarStyles.desktopNavItemActive : ""
  }`


  const mobileLinks = (estaAtivo) =>
  `${navbarStyles.mobileMenuItem} ${
    estaAtivo ? navbarStyles.mobileMenuItemActive: navbarStyles.mobileMenuItemHover
  }`


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
            <div className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-700
             to-cyan-600 font-serif leading-[0.95]">
              SkillForge
            </div>
          </div>
          {/* Desktop */}
        <div className={navbarStyles.desktopNav}>
        <div className={navbarStyles.desktopNavContainer}>
            {navItems.map((item) => {
              const Icone = item.icone
               return(
                 <NavLink key={item.nome} to={item.href} end={item.href === "/"} 
                  className={({estaAtivo}) => DesktopLinks(estaAtivo)}>
                  <div className="flex items-center space-x-2">
                   <Icone size={16} className={ navbarStyles.desktopNavIcon}/>
                   <span className={navbarStyles.desktopNavText}>
                    {item.nome}
                   </span>
                  </div>
                 </NavLink>
               )
            })}
        </div>
        </div>
        {/* lado Direito */}
        <div className={navbarStyles.authContainer}>

        </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
