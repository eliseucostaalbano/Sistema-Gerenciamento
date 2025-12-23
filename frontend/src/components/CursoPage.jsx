import {coursePageStyles,coursePageCustomStyles} from "../assets/dummyStyles";
import cursos from "../assets/dummyData.js";

const CursoPage = () => {
  return (
    <div className={coursePageStyles.pageContainer}>
      <div className={coursePageStyles.headerContainer}>
        <div className={coursePageStyles.headerTransform}>
          <h1 className={coursePageStyles.headerTitle}>APRENDA & CRESÇA</h1>
        </div>
      </div>
    </div>
  );
};

export default CursoPage;
