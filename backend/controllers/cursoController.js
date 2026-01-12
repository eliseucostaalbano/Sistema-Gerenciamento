import Curso from "../models/CursoModel";
import { getAuth } from "@clerk/express";

const toNumber = (v, fallback = 0) => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const parseJSONSafe = (talvez) => {
  if (!talvez) return null;
  if (typeof talvez === "object") return talvez;
  try {
    return JSON.parse(talvez);
  } catch {
    return null;
  }
};

const computeDerivedFields = (courseObj) => {
  let cursoMinutosTotal = 0;

  if (!Array.isArray(courseObj.palestras)) courseObj.palestras = [];

  courseObj.palestras = courseObj.palestras.map((pal) => {
    pal = { ...pal };
    pal.duracao = pal.duracao || {};
    pal.capitulos = Array.isArray(pal.capitulos) ? pal.capitulos : [];

    let capitulosSum = 0;

    pal.capitulos = pal.capitulos.map((cap) => {
      cap = { ...cap };
      cap.duracao = cap.duracao || {};

      const chHoras = toNumber(cap.duracao.horas) || 0;
      const chMins = toNumber(cap.duracao.minutos) || 0;
      const chTotal = Math.max(0, chHoras * 60 + chMins);

      cap.minutosTotais = chTotal;
      cap.duracao.horas = Math.floor(chHoras);
      cap.duracao.minutos = Math.floor(chMins);
      cap.nome = cap.nome || "";
      cap.topico = cap.topico || "";
      cap.videoUrl = cap.videoUrl || "";

      capitulosSum += chTotal;
      return cap;
    });

    const lecHoras = toNumber(pal.duracao.horas) || 0;
    const lecMins = toNumber(pal.duracao.minutos) || 0;
    const palestraPropiosMinutos = Math.max(0, lecHoras * 60 + lecMins);

    const palestraMinutosTotal =
      pal.capitulos.length > 0 ? capitulosSum : palestraPropiosMinutos;

    pal.minutosTotais = palestraMinutosTotal;
    pal.duracao.horas = Math.floor(palestraMinutosTotal / 60);
    pal.duracao.minutos = palestraMinutosTotal % 60;

    pal.titulo = pal.titulo || "Palestra Sem Título";

    cursoMinutosTotal += palestraMinutosTotal;
    return pal;
  });

  courseObj.duracaoTotal = courseObj.duracaoTotal || {};
  courseObj.duracaoTotal.horas = Math.floor(cursoMinutosTotal / 60);
  courseObj.duracaoTotal.minutos = cursoMinutosTotal % 60;

  courseObj.totalPalestras = courseObj.palestras.length;

  return courseObj;
};

const makeImageAbsolute = (rawImage, req) => {
  if (!rawImage) return "";
  const imagem = String(rawImage || "");
  if (imagem.startsWith("http://") || imagem.startsWith("https://"))
    return imagem;
  if (imagem.startsWith("/")) {
    return `${req.protocol}://${req.get("host")}${imagem}`;
  }
  // if file stored as "uploads/filename" or just "filename"
  if (imagem.startsWith("uploads/")) {
    return `${req.protocol}://${req.get("host")}/${imagem}`;
  }
  return `${req.protocol}://${req.get("host")}/uploads/${imagem}`;
};

export const getCursosPublicos = async (req, res) => {
  try {
    const { home, type = "all", limite } = req.query();
    let filter = {};
    if (home === "true") {
      filter.cursoTipo = "top";
    } else if (type === "top") {
      filter.cursoTipo = "top";
    } else if (type === "regular") {
      filter.cursoTipo = "regular";
    }

    const q = Curso.find(filter).sort({ createdAt: -1 });

    if (home === "true") {
      q.limit(Number(limite || 8));
    } else if (limite) {
      q.limit(Number(limite));
    }

    const cursos = q.lean();

    const mapear = cursos.map((c) => {
      const imagemURL = makeImageAbsolute(c.imagem || "", req);
      return {
        ...c,
        imagem: imagemURL,
      };
    });

    res.json({
      sucess: true,
      items: mapear,
    });
  } catch (error) {
    console.error("getCursosPublicos erro:", error);
    return res.status(500).json({
      sucess: false,
      error: "Erro servidor",
    });
  }
};

 //get cursos

 // get cursos por id

 //criar um curso

 //deletar um curso pela id

 // avalair o curso pelo user

 // get meuRating

 //