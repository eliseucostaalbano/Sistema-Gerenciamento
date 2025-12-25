import {coursePageStyles,coursePageCustomStyles} from "../assets/dummyStyles";
import cursos from "../assets/dummyData.js";
import { Search, Star, StarHalf, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StarIcon = ({filled = false, half = false, className = ""}) => {
  if (half) {
    return <StarHalf className={`w-4 h-4 ${className}`}  fill="currentColor"/>;
  }
  return(
    <Star className={`w-4 h-4 ${className}`} fill={filled ? "currentColor" : "none"} />
  )
}

const userIcon = () => <User className={coursePageStyles.teacherIcon} />
const SearchIcon = () => <Search className={coursePageStyles.searchIcon} />

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
  const [searchQuerry, setSearchQuerry] = useState("")
  const [showAll, setShowAll] = useState(false)

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
          type="text" placeholder="Buscar cursos por nome , professor ou categoria..." 
          value={searchQuerry} onChange={(e) => {
            setSearchQuerry(e.target.value)
            setShowAll(false)
          }} className={coursePageStyles.searchInput} />
          {searchQuerry && (
            <button onClick={() =>{ setSearchQuerry("") ; setShowAll(false)

            }} className={coursePageStyles.clearButton} >
            <X className="w-5 h-5" />
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CursoPage;
