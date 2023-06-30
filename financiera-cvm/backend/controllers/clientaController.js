import conectarDB from "../config/db.js";
import generarIDUnica from "../helpers/generarID.js";
  
    
const mostrarClientas = async (req, res) => {
  try {
    const cxn = await conectarDB();
    cxn.query("SELECT * FROM clienta", (err, result) => {
      res.status(200).json(result);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const registrarClienta = async (req, res) => {
    const {
      id_coordinador,
      nombreCliente,
      apellidoClienteP,
      apellidoClienteM,
      direccionCliente,
      telefonoCliente,
      fecha,
      credito,
      nombreAval,
      apellidoAvalP,
      apellidoAvalM,
      direccionAval,
      telefonoAval,
    } = req.body;
  
    const nombreCompleto = nombreCliente + " " + apellidoClienteP + " " + apellidoClienteM;
    const nombreCompletoAval = nombreAval + " " + apellidoAvalP + " " + apellidoAvalM;
    const idCliente = generarIDUnica();;
    
  
    try {
      const cxn = await conectarDB();
  
      cxn.query(
        "INSERT INTO clienta (id_cliente, nombre_cliente, direccion, telefono, credito, id_coordinador, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idCliente, nombreCompleto, direccionCliente, telefonoCliente, credito, id_coordinador, fecha]
      );
  
      cxn.query(
        "INSERT INTO avales (nombre_aval, direccion, telefono, id_cliente) VALUES (?, ?, ?, ?)",
        [nombreCompletoAval, direccionAval, telefonoAval, idCliente]
      );
  
      res.status(200).json({ mensaje: "Clienta registrada correctamente" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ mensaje: "Error en el servidor" });
    }
  };
  

export { mostrarClientas, registrarClienta };

