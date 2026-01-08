import {coursePageStyles, coursePageCustomStyles} from "../assets/dummyStyles";
import cursos from "../assets/dummyData.js";
import { Search, SmilePlus, Star, StarHalf, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, Slide, ToastContainer } from "react-toastify";

const StarIcon = ({ filled = false, half = false, className = "" }) => {
  if (half) {
    return <StarHalf className={`w-4 h-4 ${className}`} fill="currentColor" />;
  }
  return (
    <Star
      className={`w-4 h-4 ${className}`}
      fill={filled ? "currentColor" : "none"}
    />
  );
};

const UserIcon = () => <User className={coursePageStyles.teacherIcon} />;
const SearchIcon = () => <Search className={coursePageStyles.searchIcon} />;

const CursoPage = () => {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState(() => {
    try {
      const raw = localStorage.getItem("userCourseRatings");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [searchQuerry, setSearchQuerry] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("userCourseRatings", JSON.stringify(ratings));
    } catch {
      //ignore
    }
  }, [ratings]);

  const handleRating = (courseId, newRating, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setRatings((prev) => ({
      ...prev,
      [courseId]: newRating,
    }));
  };

  const cursosFiltrados = cursos.filter(
    (curso) =>
      curso.nome.toLowerCase().includes(searchQuerry.toLowerCase()) ||
      curso.professor.toLowerCase().includes(searchQuerry.toLowerCase()) ||
      curso.categoria.toLowerCase().includes(searchQuerry.toLowerCase())
  );

  const VISIBLE_COUNT = 8;
  const visibleCourses = showAll
    ? cursosFiltrados
    : cursosFiltrados.slice(0, VISIBLE_COUNT);
  const remainingCount = Math.max(0, cursosFiltrados.length - VISIBLE_COUNT);

  const showLoginToast = () => {
    toast.error("por favor, faça login para acessar este curso", {
      position: "top-right",
      transition: Slide,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const cursosDisponivel = (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showLoginToast();
      return;
    }
    navigate(`/curso/${courseId}`);
  };

  const cursoEGratis = (curso) => {
    return curso.gratuito || !curso.preco;
  };

  const getPriceDisplay = (curso) => {
    if (cursoEGratis(curso)) {
      return "Grátis";
    }

    if (curso.preco?.promocional != null) {
      return {
        current: `R$${curso.preco.promocional}`,
        original:
          curso.preco.original > curso.preco.promocional
            ? `R$${curso.preco.original}`
            : null,
      };
    }

    if (curso.preco?.original != null) {
      return {
        current: `R$${curso.preco.original}`,
        original: null,
      };
    }

    return "Grátis";
  };

  return (
    <div className={coursePageStyles.pageContainer}>
      <div className={coursePageStyles.headerContainer}>
        <div className={coursePageStyles.headerTransform}>
          <h1 className={coursePageStyles.headerTitle}>APRENDA & CRESÇA</h1>
        </div>
        <p className={coursePageStyles.headerSubtitle}>
          Tenha Novas Habildades com Cursos Nivel-Expert
        </p>
        <div className={coursePageStyles.searchContainer}>
          <div className={coursePageStyles.searchGradient} />
          <div className={coursePageStyles.searchInputContainer}>
            <div className={coursePageStyles.searchIconContainer}>
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar cursos por nome , professor ou categoria..."
              value={searchQuerry}
              onChange={(e) => {
                setSearchQuerry(e.target.value);
                setShowAll(false);
              }}
              className={coursePageStyles.searchInput}
            />
            {searchQuerry && (
              <button
                onClick={() => {
                  setSearchQuerry("");
                  setShowAll(false);
                }}
                className={coursePageStyles.clearButton}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        {/* Resultados */}
        {searchQuerry && (
          <div className="text-center">
            <p className={coursePageStyles.resultsCount}>
              {cursosFiltrados.length} Cursos Encontrado
              {cursosFiltrados.length !== 1 ? "s" : ""} para "{searchQuerry}"
            </p>
          </div>
        )}
      </div>

      <div className={coursePageStyles.coursesGrid}>
        {cursosFiltrados.length === 0 ? (
          <div className={coursePageStyles.noCoursesContainer}>
            <div className="text-gray-400 mb-4">
              <SmilePlus className={coursePageStyles.noCoursesIcon} />
            </div>
            <h3 className={coursePageStyles.noCoursesTitle}>
              Nenhum curso encontrado
            </h3>
            <button
              onClick={() => {
                setSearchQuerry("");
                setShowAll(false);
              }}
              className={coursePageStyles.noCoursesButton}
            >
              Mostrar Cursos
            </button>
          </div>
        ) : (
          <>
            <div className={coursePageStyles.coursesGridContainer}>
              {visibleCourses.map((curso, index) => {
                const userRating = ratings[curso.id] || 0;
                const gratis = cursoEGratis(curso);
                const priceDisplay = getPriceDisplay(curso);

                return (
                  <div
                    key={curso.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => cursosDisponivel(curso.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") cursosDisponivel(curso.id);
                    }}
                    className={coursePageStyles.courseCard}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className={coursePageStyles.courseCardInner}>
                      <div className={coursePageStyles.courseCardContent}>
                        {/* Image */}
                        <div className={coursePageStyles.courseImageContainer}>
                          <img
                            src={curso.imagem}
                            alt={curso.nome}
                            className={coursePageStyles.courseImage}
                          />
                        </div>

                        <div className={coursePageStyles.courseInfo}>
                          <h3 className={coursePageStyles.courseName}>
                            {curso.nome}
                          </h3>

                          <div className={coursePageStyles.teacherContainer}>
                            <UserIcon />
                            <span className={coursePageStyles.teacherName}>
                              {curso.professor}
                            </span>
                          </div>
                          <div className={coursePageStyles.ratingContainer}>
                            <div className={coursePageStyles.ratingStars}>
                              <div
                                className={coursePageStyles.ratingStarsInner}
                              >
                                {[1, 2, 3, 4, 5].map((star) => {
                                  const filled = star <= userRating;
                                  return (
                                    <button
                                      key={star}
                                      onClick={(e) =>
                                        handleRating(curso.id, star, e)
                                      }
                                      className={
                                        coursePageStyles.ratingStarButton
                                      }
                                      aria-label={`Rate ${star} star${
                                        star > 1 ? "s" : ""
                                      }`}
                                    >
                                      <StarIcon
                                        filled={filled}
                                        className={
                                          filled
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                        }
                                      />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className={coursePageStyles.priceContainer}>
                            <div className="flex items-center space-x-2">
                              {gratis ? (
                                <span className={coursePageStyles.priceFree}>
                                  Grátis
                                </span>
                              ) : (
                                <>
                                  <span
                                    className={coursePageStyles.priceCurrent}
                                  >
                                    {typeof priceDisplay === "object"
                                      ? priceDisplay.current
                                      : priceDisplay}
                                  </span>
                                  {typeof priceDisplay === "object" &&
                                    priceDisplay.original && (
                                      <span
                                        className={
                                          coursePageStyles.priceOriginal
                                        }
                                      >
                                        {priceDisplay.original}
                                      </span>
                                    )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} transition={Slide} theme="dark" />
      <style>{coursePageCustomStyles}</style>
    </div>
  );
};

export default CursoPage;
