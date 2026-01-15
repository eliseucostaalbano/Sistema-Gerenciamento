import express from "express";
import multer from "multer";
import path from "path";
import {
  criarCurso,
  deletarCurso,
  getCursos,
  getCursosById,
  getCursosPublicos,
  getMeuRating,
  rateCursos,
} from "../controllers/cursoController.js";

const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), "uploads")),
  filename: (req, file, cb) => {
    unico = Date.now() + "" + Math.round(Math.random() * 1e9);
    ext = path.extname(file.originalname);
    cb(null, `curso-${unico}${ext}`);
  },
});

const upload = multer({ armazenamento });

const cursoRouter = express.Router();

//rotas get
cursoRouter.get("/public", getCursosPublicos);
cursoRouter.get("/", getCursos);
cursoRouter.get("/:id", getCursosById);
cursoRouter.get("/:cursoId/rating", getMeuRating);

// rotas post
cursoRouter.post("/", upload.single("image"), criarCurso);
cursoRouter.post("/:cursoId/rate", rateCursos);

// rota delete
cursoRouter.delete("/:id", deletarCurso);

export default cursoRouter