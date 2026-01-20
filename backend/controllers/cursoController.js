import Curso from "../models/CursoModel.js";
import { getAuth } from "@clerk/express";
import fs from "fs";
import path from "path";

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

    const cursos = await q.lean();

    const mapear = cursos.map((c) => {
      const imagemURL = makeImageAbsolute(c.imagem || "", req);
      return {
        ...c,
        imagem: imagemURL,
      };
    });

    res.json({
      success: true,
      items: mapear,
    });
  } catch (error) {
    console.error("getCursosPublicos erro:", error);
    return res.status(500).json({
      success: false,
      error: "Erro servidor",
    });
  }
};

export const getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ createdAt: -1 }).lean();
    const mapeado = cursos.map((c) => ({
      ...c,
      imagem: makeImageAbsolute(c.imagem || "", req),
    }));
    return res.json({
      success: true,
      cursos: mapeado,
    });
  } catch (error) {
    console.error("getCursos erro:", error);
    return res.status(500).json({
      success: false,
      error: "Erro servidor",
    });
  }
};

export const getCursosById = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findById(id).lean();
    if (!curso)
      return res.status(404).json({
        success: false,
        error: "Não encontrado",
      });
    curso.imagem = makeImageAbsolute(curso.imagem || "", req);
    return res.json({
      success: true,
      curso
    });
  } catch (error) {
    console.error("getCursosById erro:", error);
    return res.status(500).json({
      success: false,
      error: "Erro servidor",
    });
  }
};

export const criarCurso = async (req, res) => {
  try {
    const body = req.body || {};

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : body.imagem || "";

    const priceParsed = parseJSONSafe(body.preco) ?? (body.preco || {});
    const preco = {
      original: toNumber(priceParsed.original ?? body["price.original"] ?? 0),
      sale: toNumber(priceParsed.venda ?? body["price.venda"] ?? 0),
    };

    let palestras = parseJSONSafe(body.palestras) ?? body.palestras ?? [];
    if (!Array.isArray(palestras)) palestras = [];

    palestras = palestras.map((pal) => {
      const palestra = { ...pal };
      palestra.duracao = palestra.duracao || {};
      palestra.duracao.horas = toNumber(palestra.duracao.horas);
      palestra.duracao.minutos = toNumber(palestra.duracao.minutos);

      palestra.capitulos = Array.isArray(palestra.capitulos)
        ? palestra.capitulos
        : [];
      palestra.capitulos = palestra.capitulos.map((ch) => ({
        ...ch,
        duracao: {
          horas: toNumber(ch.duracao?.horas),
          minutos: toNumber(ch.duracao?.minutos),
        },
        minutosTotais: toNumber(ch.minutosTotais, 0),
        videoUrl: ch.videoUrl || "",
        name: ch.nome || "",
        topic: ch.topico || "",
      }));

      return {
        ...palestra,
        titulo: palestra.titulo || "Palestra sem titulo",
        minutosTotais: toNumber(palestra.minutosTotais, 0),
      };
    });

    const courseObj = {
      nome: body.nome || "",
      professor: body.professor || "",
      imagem: imagePath,
      rating: toNumber(body.rating, 0),
      precoTipo: body.precoTipo || "gratis",
      preco,
      overview: body.overview || body.descricao || "",
      duracaoTotal: parseJSONSafe(body.duracaoTotal) ?? {
        horas: toNumber(body["duracaoTotal.horas"]),
        minutos: toNumber(body["duracaoTotal.minutos"]),
      },
      palestrasTotal: toNumber(body.palestrasTotal, palestras.length),
      palestras,
      cursoTipo: body.cursoTipo || "regular",
      categoria: body.categoria || null,
      createdBy: body.createdBy || null,
    };

    computeDerivedFields(courseObj);
    const curso = new Curso(courseObj);
    await curso.save();

    const retorno = curso.toObject();
    retorno.imagem = makeImageAbsolute(retorno.imagem || "", req);
    return res.status(201).json({
      success: true,
      curso: retorno,
    });
  } catch (error) {
    console.error("criarCursos erro:", error);
    return res.status(500).json({
      success: false,
      error: "Erro servidor",
    });
  }
};

export const deletarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    if (!curso)
      return res.status(404).json({
        success: false,
        error: "Não encontrado",
      });

    try {
      if (curso.imagem && !curso.imagem.startsWith("http")) {
        const filePath = path.join(
          process.cwd(),
          curso.imagem.startsWith("/") ? curso.imagem.slice(1) : curso.imagem
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    } catch (err) {}
    await curso.deleteOne();
    return res.json({
      success: true,
      messagem: "Curso deletado",
    });
  } catch (error) {
    console.error("deletarCurso erro:", error);
    return res.status(500).json({
      success: false,
      error: "Erro servidor",
    });
  }
};

export const rateCursos = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) {
      return res.status(401).json({
        success: false,
        messagem: "Autenticação necessarío",
      });
    }
    const { cursoId } = req.params;
    const { rating: newRating, comentario = "" } = req.body;
    const rating = Number(newRating);

    if (!Number(isFinite(rating)) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        messagem: "Rating deve ser de 1 a 5",
      });
    }

    const curso = await Curso.findById(cursoId);
    if (!curso) {
      return res.status(404).json({
        success: false,
        messagem: "Curso não encontrado",
      });
    }
    const idx = (curso.ratings || []).findIndex(
      (r) => String(r.userId) === String(userId)
    );

    if (idx >= 0) {
      curso.ratings[idx].rating = rating;
      if (typeof comentario === "string" && comentario.trim().length) {
        curso.ratings[idx].comment = comentario.trim();
      }
      curso.ratings[idx].updatedAt = new Date();
    } else {
      curso.ratings.push({
        userId,
        rating,
        comentario: typeof comentario === "string" ? comentario.trim() : "",
      });
    }

    const ratingsArr = curso.ratings || [];
    const totalRatings = ratingsArr.length;
    const sum = ratingsArr.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    const avgRating =
      totalRatings === 0 ? 0 : Number((sum / totalRatings).toFixed(2));

    curso.totalRatings = totalRatings;
    curso.avgRating = avgRating;

    await curso.save();
    return res.json({
      success: true,
      avgRating: curso.avgRating,
      totalRatings: curso.totalRatings,
      meuRating: { userId, rating },
    });
  } catch (error) {
    console.error("rateCurso error:", error);
    if (error && error.name === "ValidationError") {
      return res.status(400).json({ success: false, messagem: error.messagem });
    }
    return res.status(500).json({ success: false, messagem: "Server error" });
  }
};

export const getMeuRating = async (req, res) => {
  try {
    const { userId } = getAuth(req) || {};
    if (!userId) {
      return res.status(401).json({
        success: false,
        messagem: "Autenticação necessarío",
      });
    }
    const curso = await Curso.findById(id).lean();
    if (!curso)
      return res.status(404).json({
        success: false,
        messagem: " Curso Não encontrado",
      });

    const meu = (curso.rating || []).find(
      (r) => String(r.userId) === String(userId) || null
    );
    return res.json({
      success: true,
      meuRating: meu
        ? { rating: meu.rating, comentario: meu.comentario }
        : null,
    });
  } catch (error) {
    console.error("getMeurating erro:", error);
    return res.status(500).json({
      success: false,
      error: "Erro servidor",
    });
  }
};
