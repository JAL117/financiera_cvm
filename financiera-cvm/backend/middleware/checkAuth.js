//import conectarDB from "../config/db.js";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
    const token = req.headers.autorizacion;
    if(!token) return res.status(401).json({mensaje: "No hay token, permiso no válido"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        next();
    }
     catch (error) {
        console.log(error);
        res.status(401).json({mensaje: "Token no válido"});   
    }
}


export default checkAuth;