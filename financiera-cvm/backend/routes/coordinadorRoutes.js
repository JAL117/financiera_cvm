import express from "express";
import { login, registrarCoordinador }  from "../controllers/coordinadorController.js";

const router = express.Router();

router.post("/login", login);
router.post("/registrarCoordinador", registrarCoordinador);


export default router;