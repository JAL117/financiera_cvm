import express from "express";
import { mostrarClientas, registrarClienta }  from "../controllers/clientaController.js";

const router = express.Router();

router.get("/", mostrarClientas);
router.post("/registrarClienta", registrarClienta);

export default router;