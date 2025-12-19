import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Local from "./components/Local";
import Cursos from "./components/Cursos";
import Sobre from "./components/Sobre";
import Contato from "./components/Contato";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/local" element={<Local />} />
        <Route path="/contato" element={<Contato />}/>
      </Routes>
    </>
  );
}

export default App;
