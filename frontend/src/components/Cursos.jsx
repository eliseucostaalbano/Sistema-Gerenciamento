import { homeCoursesStyles } from "../assets/dummyStyles";
import { coursesData } from "../assets/dummyHdata";
import {useNavigate} from 'react-router-dom'
import { Star } from "lucide-react";
import {toast} from 'react-toastify'

const Cursos = () => {
  const navigate = useNavigate()
  const {title , course: courseFont, detail} = homeCoursesStyles.fonts
  const cursosVisivies = coursesData.slice(0,8)
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
      </div>
    </div>
  )
}

export default Cursos