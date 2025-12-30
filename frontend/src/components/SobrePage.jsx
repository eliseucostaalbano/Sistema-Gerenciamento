import { useState, useEffect } from "react";
import { aboutUsStyles, aboutUsAnimations } from "../assets/dummyStyles";
import {counterTargets, statsMeta, missionVisionValues, teamMembers, values, testimonials } from "../assets/dummyAbout";
import AboutBanner from "../assets/AboutBannerImage.png";
import { Star } from "lucide-react";

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

      <div>
        {missionVisionValues.map((section, index) => (
          <section key={section.type} className={`${aboutUsStyles.sectionContainer} ${section.bgColor}
           ${index % 2 === 1 ? "bg-white" : ""}`}>
           <div className={aboutUsStyles.sectionGrid}>
            <div className={`${aboutUsStyles.sectionContentGrid} ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
             <div className={`${aboutUsStyles.sectionImageContainer} ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>

            </div>
            </div>
           </div>
          </section>
        ))}
      </div>
      <style jsx>{aboutUsAnimations}</style>
    </div>
  );
};

export default SobrePage;
