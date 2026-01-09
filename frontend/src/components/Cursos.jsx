import { homeCoursesStyles } from "../assets/dummyStyles";
import { coursesData } from "../assets/dummyHdata";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, User } from "lucide-react";
import { toast, Slide, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const Cursos = () => {
  const navigate = useNavigate();
  const { title, course: courseFont, detail } = homeCoursesStyles.fonts;
  const cursosVisivies = coursesData.slice(0, 8);

  const [userRatings, setUserRatings] = useState(() => {
    try {
      const raw = localStorage.getItem("userCourseRatings");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [hoverRatings, setHoverRatings] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem("userCourseRatings", JSON.stringify(userRatings));
    } catch {}
  }, [userRatings]);

  const showLoginToast = () => {
    toast.error("Faça o login para acessar o curso", {
      position: "top-right",
      transition: Slide,
      autoClose: 3000,
      theme: "dark",
    });
  };

  const lidarCursoClick = (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      showLoginToast();
      return;
    }
    navigate(`/curso/${id}`);
  };

  const lidarBrowserClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Faça o login para acessar os cursos", {
        position: "top-right",
        transition: Slide,
        autoClose: 3000,
        theme: "dark",
      });
    }
    navigate("/cursos");
  };

  const handleSetRating = (e, courseId, rating) => {
    e.stopPropagation();
    setUserRatings((prev) => ({ ...prev, [courseId]: rating }));
  };

  const renderInteractiveStars = (curso) => {
    const userRating = userRatings[curso.id] || 0;
    const hover = hoverRatings[curso.id] || 0;
    const displayRating = hover || userRating;

    return (
      <div className={homeCoursesStyles.starsContainer}>
        <div
          className={homeCoursesStyles.interactiveStars}
          onClick={(e) => e.stopPropagation()}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const idx = i + 1;
            const filled = idx <= displayRating;

            return (
              <button
                key={i}
                onClick={(e) => handleSetRating(e, curso.id, idx)}
                onMouseEnter={() =>
                  setHoverRatings((s) => ({ ...s, [curso.id]: idx }))
                }
                onMouseLeave={() =>
                  setHoverRatings((s) => ({ ...s, [curso.id]: 0 }))
                }
                className={`${homeCoursesStyles.starButton} ${
                  filled
                    ? homeCoursesStyles.starButtonActive
                    : homeCoursesStyles.starButtonInactive
                }`}
                style={{ background: "transparent" }}
              >
                <Star
                  size={16}
                  fill={filled ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={homeCoursesStyles.starIcon}
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={homeCoursesStyles.container}>
      <div className={homeCoursesStyles.mainContainer}>
        <div className={homeCoursesStyles.header}>
          <h2 className={`${title} ${homeCoursesStyles.title}`}>
            <Star className={homeCoursesStyles.titleIcon} />
            Explore Cursos Top
            <Star className={homeCoursesStyles.titleIcon} />
          </h2>
        </div>

        <div className={homeCoursesStyles.coursesGrid}>
          {cursosVisivies.map((curso) => {
            const gratis = !!curso.gratuito || !curso.preco;
            return (
              <div
                key={curso.id}
                onClick={() => lidarCursoClick(curso.id)}
                className={homeCoursesStyles.courseCard}
              >
                <div className={homeCoursesStyles.imageContainer}>
                  <img
                    src={curso.imagem}
                    alt={curso.nome}
                    className={homeCoursesStyles.courseImage}
                    loading="lazy"
                  />
                </div>

                <div className={homeCoursesStyles.courseInfo}>
                  <h3
                    className={`${courseFont}n${homeCoursesStyles.courseName}`}
                  >
                    {curso.nome}
                  </h3>
                  <div className={`${detail} ${homeCoursesStyles.teacherInfo}`}>
                    <User size={16} className={homeCoursesStyles.teacherInfo} />
                    <span className={homeCoursesStyles.teacherName}>
                      {curso.professor}
                    </span>
                  </div>
                  <div className={homeCoursesStyles.ratingContainer}>
                    {renderInteractiveStars(curso)}
                  </div>
                  <div className={homeCoursesStyles.pricingContainer}>
                  {gratis ? (
                    <span className={homeCoursesStyles.freePrice}>
                      Grátis
                    </span>
                  ):(
                    <>
                    <span className={homeCoursesStyles.salePrice}>
                    R${curso.preco?.sale ?? "."}
                    </span>
                    {curso.preco?.original && (
                      <span className={homeCoursesStyles.originalPrice}>
                        R${curso.preco.original}
                      </span>
                    )}
                    </>
                  )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       <div className={homeCoursesStyles.ctaContainer}>
        <div className={homeCoursesStyles.ctaWrapper}>
          <span aria-hidden="true"
              className={homeCoursesStyles.ctaGlow}
              style={{
                zIndex: 0,
                background:
                  "conic-gradient(from 0deg, rgba(236,72,153,0.9), rgba(99,102,241,0.9), rgba(139,92,246,0.9), rgba(236,72,153,0.9))",
                filter: "blur(5px)",
                opacity: 0.8,
              }} />
             <button
              onClick={lidarBrowserClick}
              className={homeCoursesStyles.ctaButton}
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              }}
            >
              <span className={homeCoursesStyles.ctaButtonContent}>
                <span className={homeCoursesStyles.ctaText}>
                  Descubra os cursos
                </span>
                <ArrowRight className={homeCoursesStyles.ctaIcon}/>
              </span>
            </button>
        </div>
       </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide} />
      <style>{homeCoursesStyles.animations}</style>
    </div>
  );
};

export default Cursos;
