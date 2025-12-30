import Home from "./pages/Home"
import Add from "./pages/Add"
import ListaCursos from "./pages/ListaCursos"
import Agendamentos from "./pages/Agendamentos"
import { Route, Routes } from "react-router-dom"  

const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/addcurso" element={<Add />} />
    <Route path="/listacursos" element={<ListaCursos />} />
    <Route path="/agendamentos" element={<Agendamentos />} />
   </Routes>
  )
}

export default App