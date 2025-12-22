import mongoose from "mongoose";

const capituloSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    topico: { type: String, required: true },
    duracao: {
      horas: { type: Number, default: 0 },
      minutos: { type: Number, default: 0 },
    },
    minutosTotais: { type: Number, default: 0 },
    videoUrl: { type: String, required: true },
  },
  { _id: true }
);

// palestra Schema
const palestraSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
     duracao: {
      horas: { type: Number, default: 0 },
      minutos: { type: Number, default: 0 },
    },
    minutosTotais: { type: Number, default: 0 },
    capitulos: [capituloSchema],
});

const cursoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    palestras: { type: String, required: true },
    imagem: { type: String },
    ratings: [
      {
        userId: { type: String, required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        comentario: { type: String, default: "" },
        updatedAt: { type: Date, default: null },
      },
    ],
    avgRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },

    precoTipo: { type: String, enum: ["gratis", "pago"], default: "gratis" },
    preco: {
      original: { type: Number, default: 0 },
      venda: { type: Number, default: 0 },
    },
    overview: { type: String },
    duracaoTotal: {
      horas: { type: Number, default: 0 },
      minutos: { type: Number, default: 0 },
    },
    palestrasTotal: { type: Number, default: 0 },
    palestras: [palestraSchema],
    CursoTipo: { type: String, enum: ["regular", "top"], default: "regular" },
  },
  { timestamps: true }
);

cursoSchema.pre("save", async function () {
  if (!Array.isArray(this.palestras)) this.palestras = [];

  let cursoMinutosTotal = 0;

  this.palestras = this.palestras.map((palestra) => {
    palestra = palestra || {};
    palestra.duracao = palestra.duracao || {};
    palestra.capitulos = Array.isArray(palestra.capitulos) ? palestra.capitulos : [];

    let capitulosSum = 0;
    palestra.capitulos = palestra.capitulos.map((capitulo) => {
      capitulo = capitulo || {};
      capitulo.duracao = capitulo.duracao || {};
      const chHoras = Number(capitulo.duracao.horas) || 0;
      const chMins = Number(capitulo.duracao.minutos) || 0;
      const chTotal = Math.max(0, chHoras * 60 + chMins);
      capitulo.minutosTotais = chTotal;
      capitulo.duracao.horas = Math.floor(chHoras);
      capitulo.duracao.minutos = Math.floor(chMins);
      capitulo.nome = capitulo.nome || "";
      capitulo.topico = capitulo.topico || "";
      capitulo.videoUrl = capitulo.videoUrl || "";
      capitulosSum += chTotal;
      return capitulo;
    });

    const lecHoras = Number(palestra.duracao.horas) || 0;
    const lecMins = Number(palestra.duracao.minutos) || 0;
    const palestraPropiosMinutos = Math.max(0, lecHoras * 60 + lecMins);

    const palestraMinutosTotal = palestra.capitulos.length > 0 ? capitulosSum : palestraPropiosMinutos;

    palestra.minutosTotais = palestraMinutosTotal;
    palestra.duracao.horas = Math.floor(palestraMinutosTotal / 60);
    palestra.duracao.minutos = palestraMinutosTotal % 60;

    palestra.titulo = palestra.titulo || "Palestra Sem Título";

    cursoMinutosTotal += palestraMinutosTotal;
    return palestra;
  });

  this.duracaoTotal = this.duracaoTotal || {};
  this.duracaoTotal.horas = Math.floor(cursoMinutosTotal / 60);
  this.duracaoTotal.minutos = cursoMinutosTotal % 60;

  this.totalPalestras = Array.isArray(this.palestras) ? this.palestras.length : 0;
});

const Curso = mongoose.models.Curso || mongoose.model("Curso", cursoSchema);

export default Curso;