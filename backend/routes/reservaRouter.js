import express from "express";
import {checarReserva, confimarPagamento, criarReservas, getReserva, getStats, getUserReservas} from "../controllers/reservaController.js";

const reservaRouter = express.Router();

reservaRouter.get("/", getReserva);
reservaRouter.get("/stats", getStats);

reservaRouter.post("/criar", criarReservas);
reservaRouter.get("/confimar", confimarPagamento);

reservaRouter.get("/meu", getUserReservas);
reservaRouter.get("/check", checarReserva);

export default reservaRouter;
