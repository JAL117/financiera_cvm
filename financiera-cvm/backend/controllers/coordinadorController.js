import conectarDB from "../config/db.js";
import generarIDUnica from "../helpers/generarID.js";
import generarContrasena from "../helpers/generarContrasena.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { id_coordinador, contrasena } = req.body;
  try {
    const cxn = await conectarDB();
    cxn.query(
      "SELECT * FROM coordinadores WHERE id_coordinador = ?",
      [id_coordinador],
      async (err, result) => {
        if (result.length > 0) {
          const contrasenaCorrecta = await bcrypt.compare(
            contrasena,
            result[0].contrasena
          );
          if (contrasenaCorrecta) {
            res.status(200).json({ mensaje: "Coordinador loggeado correctamente", coordinador: result[0] });
          } else {
            res.status(401).json({ mensaje: "Contraseña incorrecta" });
          }
        } else {
          res.status(404).json({ mensaje: "Coordinador no encontrado" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const registrarCoordinador = async (req, res) => {
  const { nombre, apellidoP, apellidoM, correoElectronico, telefono } =
    req.body;
  const nombreCompleto = nombre + " " + apellidoP + " " + apellidoM;
  const idCoordinador = generarIDUnica();
  const contrasena = generarContrasena();
  const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
  try {
    const cxn = await conectarDB();
    cxn.query(
      "INSERT INTO coordinadores (id_coordinador, contrasena, nombre_coordinador, telefono) VALUES (?, ?, ?, ?)",
      [idCoordinador, contrasenaEncriptada, nombreCompleto, telefono]
    );
    res
      .status(200)
      .json({ mensaje: "Coordinador registrado correctamente", contrasena });
  } catch (e) {
    console.log(e);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export { login, registrarCoordinador };
