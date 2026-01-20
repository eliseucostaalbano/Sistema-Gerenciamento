import Reserva from "../models/ReservaModel.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

const CHAVE_STRIPE = process.env.STRIPE_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
const stripe = CHAVE_STRIPE
  ? new Stripe(CHAVE_STRIPE, { apiVersion: "2023-10-16" })
  : null;

export const getReserva = async (res, req) => {};

export const getStats = async (res, req) => {};

export const criarReservas = async (res, req) => {};

export const checarReserva = async (res, req) => {}

export const confimarPagamento = async (res, req) => {};

export const getUserReservas = async (res, req) => {};
