import { facultyStyles } from "../assets/dummyStyles";
import sampleTeachers from "../assets/dummyFaculty";
import { Instagram, Linkedin, Mail, Star } from "lucide-react";

const motion = {
  div: ({ children, initial, animate, transition, className }) => (
    <div className={className}>{children}</div>
  ),
};

const LocalPage = () => {
  return (
    <div className={facultyStyles.container}>
      <div className={facultyStyles.header}>
        <div className={facultyStyles.headerContent}>
          <h1 className={facultyStyles.title}>Conheça Nossa Faculdade</h1>
          <div className={facultyStyles.titleDivider}></div>
          <p className={facultyStyles.subtitle}>
            Aprenda com experts da industria e pioneros Academicos dedicados ao
            seu sucesso
          </p>
        </div>
      </div>

      {/* Grid da faculdade */}
      <div className={facultyStyles.facultySection}>
        <div className={facultyStyles.facultyContainer}>
          <div className={facultyStyles.facultyGrid}>
            {sampleTeachers.map((prof, index) => (
              <motion.div
                key={prof.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={facultyStyles.card}
              >
                <div className={facultyStyles.teacherCard}>
                  <div className={facultyStyles.imageContainer}>
                    <div className={facultyStyles.imageWrapper}>
                      <img
                        src={prof.imagem}
                        alt={prof.nome}
                        className={facultyStyles.image}
                      />
                    </div>
                    <div className={facultyStyles.experienceBadge}>
                      <div className={facultyStyles.experienceBadgeContent}>
                        {prof.experiencia} Exp
                      </div>
                    </div>
                  </div>

                  <div className={facultyStyles.teacherInfo}>
                    <h3 className={facultyStyles.teacherName}>{prof.nome}</h3>
                    <p className={facultyStyles.teacherQualification}>
                      {prof.qualificacao}
                    </p>
                    <p className={facultyStyles.teacherBio}>{prof.bio}</p>
                  </div>

                  <div className={facultyStyles.ratingContainer}>
                    <div className={facultyStyles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`${facultyStyles.starIcon} ${
                            i < Math.round(prof.initialRating)
                              ? facultyStyles.starButtonActive
                              : facultyStyles.starButtonInactive
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={facultyStyles.socialContainer}>
                   <a href={`mailto:${prof.email}`}
                      className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconEmail}`}
                      title={`Email ${prof.email}`}
                   >
                    <Mail className={facultyStyles.socialIconSvg} />
                   </a>
                   <a href={prof.linkedin} target="_blank" className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconLinkedin}`}>
                    <Linkedin  className={facultyStyles.socialIconSvg}/>
                   </a>
                   <a href={prof.instagram} target="_blank" className={`${facultyStyles.socialIcon} ${facultyStyles.socialIconInstagram}`}>
                    <Instagram  className={facultyStyles.socialIconSvg}/>
                   </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{facultyStyles.animations}</style>
    </div>
  );
};

export default LocalPage;