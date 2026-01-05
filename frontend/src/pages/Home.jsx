import NavBar from '../components/NavBar'
import Footer from '../components/Footer.jsx'
import Banner from '../components/Banner.jsx'
import Cursos from '../components/Cursos.jsx'
import Relatos from '../components/Relatos.jsx'

const Home = () => {
  return (
    <div>
        <NavBar />
        <Banner />
        <Cursos />
        <Relatos />
        <Footer />
    </div>
  )
}

export default Home