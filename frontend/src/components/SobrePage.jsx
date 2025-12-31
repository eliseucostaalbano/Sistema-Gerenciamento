import { useState, useEffect } from "react";
import { aboutUsStyles, aboutUsAnimations } from "../assets/dummyStyles";
import {counterTargets, statsMeta, missionVisionValues, teamMembers, values, testimonials } from "../assets/dummyAbout";
import AboutBanner from "../assets/AboutBannerImage.png";
import { BadgeCheck, MessageCircleCode, ShieldUser, Star} from "lucide-react";
import {DotLottieReact} from "@lottiefiles/dotlottie-react"

const SobrePage = () => {
  const [counterValues, setCounterValues] = useState({
    estudantes: 0,
    cursos: 0,
    taxaSucesso: 0,
    paises: 0,
    certificados: 0,
    suporte: 0,
  });

    useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const timers = [];

    Object.keys(counterTargets).forEach((key) => {
      let current = 0;
      const target = counterTargets[key];
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounterValues((prev) => ({
          ...prev,
          [key]: Math.floor(current),
        }));
      }, stepDuration);

      timers.push(timer);
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, []);

 const formatStatNumber = (key) => {
    if (key === "suporte") return "24/7";
    if (key === "taxaSucesso") return `${counterValues.taxaSucesso}%`;
    const val = counterValues[key] ?? 0;
    if (key === "certificados") return `${val.toLocaleString()}+`;
    return `${val.toLocaleString()}+`;
  };

  return (
    <div className={aboutUsStyles.container}>
      <section className={aboutUsStyles.heroSection}>
        <div className={aboutUsStyles.heroBackground}>
          <div
            style={{ backgroundImage: `url(${AboutBanner})`, opacity: 0.85 }}
            className={aboutUsStyles.heroImageContainer}
          />

           <div
            className={aboutUsStyles.heroVignette}
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0.72) 100%)",
            }}
          />
          <div className={aboutUsStyles.heroTint}></div>
        </div>
        <div className={aboutUsStyles.heroContent}>
            <div className={aboutUsStyles.trustBadge}>
              <Star className={aboutUsStyles.trustIcon} />
              Confiado por  50.000 + estudantes mundialmente
            </div>
            <h1 className={aboutUsStyles.mainHeading}>Sobre LearnHub</h1>
            <p className={aboutUsStyles.subHeading}>Empoderando milhões a alcançar seus sonhos através
              <span className={aboutUsStyles.inlineHighlight}>de uma educação acessível</span>
            </p>
            <div className={aboutUsStyles.statsGrid}>
            {statsMeta.slice(0, 4).map((stat, index) => (
              <div key={index} className={aboutUsStyles.statCard} style={{minWidth : 120}}> 
                <div className={aboutUsStyles.statNumber}>
                 {formatStatNumber(stat.key)}
                </div>
                <div className={aboutUsStyles.statLabel}>{stat.label}</div>
              </div>
            ))}
            </div>
          </div>
      </section>

        {missionVisionValues.map((section, index) => (
          <section key={section.type} className={`${aboutUsStyles.sectionContainer} ${section.bgColor}
           ${index % 2 === 1 ? "bg-white" : ""}`}>
           <div className={aboutUsStyles.sectionGrid}>
            <div className={`${aboutUsStyles.sectionContentGrid} ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
             <div className={`${aboutUsStyles.sectionImageContainer} ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className={aboutUsStyles.sectionImage}>
                 <DotLottieReact src={section.dotLottie}  loop autoplay />
                </div>
            </div>
            <div className={`${aboutUsStyles.sectionContent} ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
             <div className={aboutUsStyles.sectionBadge}>
               <section.icone className={`${aboutUsStyles.sectionIcon} ${section.color}`} />
               <span className={aboutUsStyles.sectionBadgeText}>
                {section.subtitulo}
               </span>
             </div>

             <h2 className={aboutUsStyles.sectionTitle}>{section.titulo}</h2>
             <p className={aboutUsStyles.sectionDescription}>{section.descricao}</p>
             <div className={aboutUsStyles.featuresContainer}>
              {section.features.map((feature, featureIndex) => (
                <div key={featureIndex} className={aboutUsStyles.featureItem}>
                  <div className={`${aboutUsStyles.featureIcon} ${section.color}`}>
                    <BadgeCheck className={aboutUsStyles.featureIconSvg} />
                  </div>
                  <span className={aboutUsStyles.featureText}>
                    {feature}
                  </span>
                </div>
              ))}
             </div>
            </div>
            </div>
           </div>
          </section>
        ))}

        <section className={aboutUsStyles.valuesSection}>
        <div className={aboutUsStyles.sectionGrid}>
          <div className={aboutUsStyles.valuesHeader}>
            <div className={aboutUsStyles.valuesBadge}>
              <ShieldUser className={aboutUsStyles.valuesBadgeIcon} />
              <span className={aboutUsStyles.valuesBadgeText}>
                Nossos Principios Guias
              </span>
            </div>
            <h2 className={aboutUsStyles.valuesTitle}>
               Valores Que Nos Define 
            </h2>
            <p className={aboutUsStyles.valuesSubtitle}>
              A fundação de tudo que fazemos no LearnHub
            </p>
          </div>

          <div className={aboutUsStyles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={aboutUsStyles.valueCard}>
                <div
                  className={`${aboutUsStyles.valueGradient} ${value.color}`}
                ></div>

                <h3
                  className={aboutUsStyles.valueCardTitle}
                  title={value.titulo}
                >
                  {value.titulo}
                </h3>

                <p className={aboutUsStyles.valueCardDescription}>
                  {value.descricao}
                </p>

                <ul className={aboutUsStyles.valueFeatures}>
                  {value.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={aboutUsStyles.valueFeatureItem}
                    >
                      <div
                        className={`${aboutUsStyles.valueFeatureDot} ${value.color}`}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div
                  className={`${aboutUsStyles.valueUnderline} ${value.color}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={aboutUsStyles.teamSection}>
       <div className={aboutUsStyles.sectionGrid}>
        <div className={aboutUsStyles.teamHeader}>
          <h2 className={aboutUsStyles.teamTitle}>Conheça Nossas Lideranças</h2>
          <p className={aboutUsStyles.teamSubtitle}>Educadores, inovadores e visionários apaixonados e dedicados ao seu sucesso</p>
        </div>
        <div className={aboutUsStyles.teamGrid}>
         {teamMembers.map((member, index) => (
          <div key={index} className={aboutUsStyles.teamMember}>
           <div className={aboutUsStyles.teamImageContainer}>
            <div className={aboutUsStyles.teamImage}>
              <img src={member.imagem} alt={member.nome} className="w-full h-full object-cover rounded-full"/>
            </div>
           </div>
           <h3 className={aboutUsStyles.teamName}>{member.nome}</h3>
           <div className={aboutUsStyles.teamRole}>{member.role}</div>
           <p className={aboutUsStyles.teamBio}>{member.bio}</p>
          </div>
         ))}
        </div>
       </div>
      </section>

      <section className={aboutUsStyles.testimonialsSection}>
        <div className={aboutUsStyles.sectionGrid}>
          <div className={aboutUsStyles.testimonialsHeader}>
            <h2 className={aboutUsStyles.testimonialsTitle}>
             O que os estudantes dizem
            </h2>
            <p className={aboutUsStyles.testimonialsSubtitle}>
             Historias reais de alunos que transformaram suas careiras
            </p>
          </div>
          <div className={aboutUsStyles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={aboutUsStyles.testimonialCard}>
                <div className={aboutUsStyles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={aboutUsStyles.testimonialStar} />
                  ))}
                </div>
                <p className={aboutUsStyles.testimonialText}>
                  "{testimonial.texto}"
                </p>
                <div className={aboutUsStyles.testimonialAuthor}>
                  <img
                    src={testimonial.imagem}
                    alt={testimonial.nome}
                    className={aboutUsStyles.testimonialAvatar}
                  />
                  <div>
                    <div className={aboutUsStyles.testimonialAuthorName}>
                      {testimonial.nome}
                    </div>
                    <div className={aboutUsStyles.testimonialAuthorRole}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={aboutUsStyles.ctaSection}>
       <div className={aboutUsStyles.ctaOrb1}></div>
        <div className={aboutUsStyles.ctaOrb2}></div>

        <div className={aboutUsStyles.ctaContent}>
          <h2 className={aboutUsStyles.ctaTitle}>Pronto Para Tranformar o Seu Futuro</h2>
          <p className={aboutUsStyles.ctaDescription}>Junte-se a milhoes de alunos que transformaram suas vidas com LearnHub. Começe sua jornada hoje com uma oferta de 7 dias gratís.</p>
          <div className={aboutUsStyles.ctaButtons}>
            <a href="/contato" className={aboutUsStyles.ctaButton}>
              <MessageCircleCode className={aboutUsStyles.ctaButtonIcon} />
              Fale com o conselheiro
            </a>
          </div>
        </div>
      </section>

      <style jsx>{aboutUsAnimations}</style>
    </div>
  );
};

export default SobrePage;