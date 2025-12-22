import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
} from "lucide-react";
import {
  footerStyles,
  footerBackgroundStyles,
  contactIconGradients,
  iconColors,
  footerCustomStyles,
} from "../assets/dummyStyles";
import {
  socialIcons,
  quickLinks,
  supportLinks,
  contactInfo,
} from "../assets/dummyFooter";
const iconMap = {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
};
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerBackgroundStyles.backgroundContainer}>
        <div className={footerBackgroundStyles.floatingOrb1}></div>
        <div className={footerBackgroundStyles.floatingOrb2}></div>
        <div className={footerBackgroundStyles.floatingOrb3}></div>
        <div className={footerBackgroundStyles.floatingOrb4}></div>

        <div className={footerBackgroundStyles.gridOverlay}>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className={footerStyles.container}>
        <div className={footerStyles.grid}>
          <div className={footerStyles.brandSection}>
            <div className={footerStyles.brandTransform}>
              <div className={footerStyles.brandContainer}>
                <div className={footerStyles.brandGradient}></div>

                <div className="relative font-serif flex items-center gap-3">
                  <img src={logo} alt="Logo" className="h-12 w-12" />
                  <h3 className={footerStyles.brandTitle}>SkillForge</h3>
                </div>
              </div>

              <p className={footerStyles.brandDescription}>
                Transforme sua journada de aprendizado com cursos interativos e tecnologia educacional de ponta projetada para estudantes modernos.
              </p>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.cyan}`}>
              <ArrowRight className={footerStyles.sectionIcon} />
              Links Rápidos
            </h4>

            <ul className={footerStyles.linksList}>
              {quickLinks.map((link, index) => {
                const Icone = iconMap[link.iconKey] || ArrowRight;  
                return (
               <li key={link.nome}>
                    <a href={link.href} 
                    className={`${footerStyles.linkItem} ${iconColors.cyan}`}
                    style={{transitionDelay : `${index * 80}ms`}}
                    >
                     <Icone className={`${footerStyles.linkIcon} ${iconColors.cyan}`} />
                     <span className="truncate">{link.nome}</span>
                    </a>
               </li>
                )       
                })}
              </ul>
          </div>
           <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.purple}`}>
              <HandHelping className={footerStyles.sectionIcon} />
              Suporte
            </h4>

            <ul className={footerStyles.linksList}>
              {supportLinks.map((link, index) => {
                const Icone = iconMap[link.iconKey] || HandHelping;  
                return (
               <li key={link.nome}>
                    <a href={link.href} 
                    className={`${footerStyles.linkItem} ${iconColors.purple}`}
                    style={{transitionDelay : `${index * 80}ms`}}
                    >
                     <Icone className={`${footerStyles.linkIcon} ${iconColors.purple}`} />
                     <span className="truncate">{link.nome}</span>
                    </a>
               </li>
                )       
                })}
              </ul>
          </div>
          {/* contato info */}
          <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.emerald}`}>
              <Phone className={footerStyles.sectionIcon} />
              Me Contate
            </h4>

            <div className={footerStyles.contactSpace}>
             <div className={footerStyles.contactItem}>
              <div className={`${footerStyles.contactIconContainer} ${contactIconGradients.address}`}>
                <MapPin className={`${footerStyles.contactIcon} ${iconColors.cyan600}`} />
              </div>
              <div className={footerStyles.contactTextContainer}>
                 <p className={footerStyles.contactTextPrimary}>
                {contactInfo.endereco}
              </p>
               <p className={footerStyles.contactTextSecondary}>
                {contactInfo.cidade}
               </p>
              </div>
             </div>
            </div>
             <div className={footerStyles.contactSpace}>
             <div className={footerStyles.contactItem}>
              <div className={`${footerStyles.contactIconContainer} ${contactIconGradients.phone}`}>
                <Phone className={`${footerStyles.contactIcon} ${iconColors.purple600}`} />
              </div>
              <div className={footerStyles.contactTextContainer}>
                 <p className={footerStyles.contactTextPrimary}>
                {contactInfo.telefone}
              </p>
               <p className={footerStyles.contactTextSecondary}>
                {contactInfo.horarioTelefone}
               </p>
              </div>
             </div>
            </div>
             <div className={footerStyles.contactSpace}>
             <div className={footerStyles.contactItem}>
              <div className={`${footerStyles.contactIconContainer} ${contactIconGradients.email}`}>
                <Mail className={`${footerStyles.contactIcon} ${iconColors.cyan600}`} />
              </div>
              <div className={footerStyles.contactTextContainer}>
                 <p className={footerStyles.contactTextPrimary}>
                {contactInfo.email}
              </p>
              </div>
             </div>
            </div>
          </div>
        </div>
        {/* social icons */}
        <div className={footerStyles.socialContainer}>
            <div className={footerStyles.socialIconsContainer}>
              {socialIcons.map((social, index) => {
                const IconComponent = iconMap[social.iconKey] || Twitter;
                return (
                  <a
                    key={social.nome}
                    href={social.url}
                    aria-label={social.nome}
                    className={footerStyles.socialIconLink}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div
                      className={`${footerStyles.socialIconContainer} ${social.bgColor}`}
                    >
                      <div className={footerStyles.socialIconInner}>
                        <IconComponent className={footerStyles.socialIcon} />
                      </div>

                      <div className={footerStyles.socialTooltip}>
                        {social.nome}
                        <div className={footerStyles.socialTooltipArrow} />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className={footerStyles.designCredit}>
            <div className={footerStyles.designCreditContainer}>
              <div className={footerStyles.designCreditGradient}></div>
              <p className={footerStyles.designCreditText}>
                Criado Por {""}
                <a href={contactInfo.website} target="_blank" className={footerStyles.designCreditLink}>
                  {contactInfo.designBy}
                </a>
              </p>
            </div>
            </div>
          </div>
      </div>
      <style>{footerCustomStyles}</style>
    </footer>
  );
};

export default Footer;
