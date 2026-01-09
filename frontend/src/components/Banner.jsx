import { useState } from "react";
import { bannerStyles, customStyles } from "../assets/dummyStyles";
import { floatingIcons, features } from "../assets/dummyBanner";
import { CircleCheckBig, Sparkle, X } from "lucide-react";
import BannerImg from "../assets/Bannerimage.jpg";
import video from "../assets/BannerVideo.mp4";

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className={bannerStyles.container}>
      <div className={bannerStyles.floatingIconsWrapper}>
        {floatingIcons.map((icon, i) => (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt || ""}
            className={`${bannerStyles.floatingIcon} ${icon.pos}`}
            style={{
              animationDelay: `${i * 0.35}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      <div className={bannerStyles.mainContent}>
        <div className={bannerStyles.grid}>
          <div className={bannerStyles.leftContent}>
            <span className={bannerStyles.badge}>
              <Sparkle className={bannerStyles.badgeIcon} />
              Novos Recursos Disponíveis
            </span>
            <h1 className={bannerStyles.heading}>
              <span className={bannerStyles.headingSpan1}>
                Construindo Produtos
              </span>
              <span className={bannerStyles.headingSpan2}>
                {" "}
                Digitais Incríveis
              </span>
            </h1>

            <p className={bannerStyles.description}>
              Crie web aplicações web lindas e responsivas com nossas
              ferramentas poderosas e componentes. Comece a construir seu
              próximo projeto hoje.
            </p>

            <div className={bannerStyles.featuresGrid}>
              {features.map((feature, i) => (
                <div key={i} className={bannerStyles.featureItem}>
                  <div className={bannerStyles.featureIconContainer}>
                    <span
                      className={`${bannerStyles.featureIcon} text-${feature.color}-500`}
                    >
                      <CircleCheckBig size={16} />
                    </span>
                  </div>
                  <span className={bannerStyles.featureText}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            {/* btns */}
            <div className={bannerStyles.buttonsContainer}>
              <a href="/cursos" className={bannerStyles.buttonGetStarted}>
                Comece Agora
              </a>
              <button
                className={bannerStyles.buttonViewDemo}
                onClick={() => setShowVideo(true)}
              >
                Veja a Demo
              </button>
            </div>
          </div>

          <div className={bannerStyles.imageContainer}>
            <img src={BannerImg} alt="" className={bannerStyles.image} />
          </div>
        </div>
      </div>
      {/* Video Modal */}
      {showVideo && (
        <div className={bannerStyles.videoModal.overlay}>
          <div className={bannerStyles.videoModal.container}>
            <iframe
              src={video}
              frameBorder="0"
              className={bannerStyles.videoModal.iframe}
              title="video Demo"
              allow="autoplay ; encrypted-media"
              allowFullScreen
            ></iframe>
            <button  onClick={() => setShowVideo(false)}
              className={bannerStyles.videoModal.closeButton}>
                <span>
                    <X className={bannerStyles.videoModal.closeIcon} />
                </span>
            </button>
          </div>
        </div>
      )}
      <style>{customStyles}</style>  
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;
