import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Local from "./pages/Local";
import Cursos from "./pages/Cursos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faculdade" element={<Local />} />
        <Route path="/contato" element={<Contato />}/>
      </Routes>
    </>
  );
}

export default App;
