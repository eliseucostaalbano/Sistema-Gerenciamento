import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  reservaId: { type: String, required: true, unique: true, index: true },
  usuarioClerckId: { type: String, required: true, index: true },
  estudanteNome: { type: String, default: "Desconhecido" },
  curso: { type: String, required: true },
  cursoNome: { type: String, required: true },
  professorNome: { type: String, default: "" },
  preco: { type: Number, required: true },
  Metodopagamento: { type: String, enum: ["Online"], default: "Online" },
  pagamentoStatus: {
    type: String,
    enum: ["Atrasado", "Pago"],
    default: "Atrasado",
  },
  pagamentoFormaId: { type: String, default: null },
  secaoId: { type: String, default: null },
  pedidoStatus: {
    type: String,
    enum: ["Esperando", "Confirmado", "Cancelado", "Completo", "Falhou"],
    default: "Esperando",
  },

  notas: { type: String, default: "" },
}, { timestamps: true });

const Reserva = mongoose.models.Reserva || mongoose.model("Reserva", reservaSchema);
export default Reserva;
