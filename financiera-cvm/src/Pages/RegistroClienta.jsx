import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';


const Register = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    direccion: "",
    telefono: "",
    credito: ""
  });
  const [aval, setAval] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    direccion: "",
    telefono: ""
  });

  const [fecha, setFecha] = useState(new Date());
  const [error, setError] = useState("");

  const handleClienteChange = (e) => {
     
    const telefono = e.target.value.replace(/\D/, "");
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleAvalChange = (e) => {
    const telefono = e.target.value.replace(/\D/, "");
    setAval({ ...aval, [e.target.name]: e.target.value });
  };

  const handleFechaChange = (date) => {
    setFecha(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validar el número de teléfono
    if (cliente.telefono.length !== 10) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El número de teléfono debe tener 10 dígitos",
      });
      return;
    }
  
    // Validar que el teléfono del cliente y el aval no sean iguales
    if (cliente.telefono === aval.telefono) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El teléfono del cliente y el aval no pueden ser iguales",
      });
      return;
    }
  

    const fechaSeleccionada = fecha.toISOString();

    console.log("Cliente:", cliente);
    console.log("Aval:", aval);
    console.log("Fecha:", fechaSeleccionada);

    setCliente({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      direccion: "",
      telefono: "",
      credito: ""
    });
    setAval({
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      direccion: "",
      telefono: ""
    });
    setFecha(new Date());
  };

  return (
    <div style={{ fontSize: "16pt" }}>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <div
          className="w-100"
          style={{
            backgroundColor: "#003559",
            padding: "30px",
            borderRadius: "15px",
            color: "#fff",
            maxWidth: "95%",
            maxHeight: "90%",
            marginTop: "5%"
          }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <h4>Cliente</h4>
                <Form.Group controlId="formNombre">
                  <Form.Label style={{ marginBottom: "8px" }}>Nombre(s)</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleClienteChange}
                    placeholder="Ingrese el/los nombre(s) de la clienta"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formApellidoPaterno">
                  <Form.Label style={{ marginBottom: "8px" }}>Apellido Paterno</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidoPaterno"
                    value={cliente.apellidoPaterno}
                    onChange={handleClienteChange}
                    placeholder="Ingrese el apellido paterno de la clienta"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formApellidoMaterno">
                  <Form.Label style={{ marginBottom: "8px" }}>Apellido Materno</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidoMaterno"
                    value={cliente.apellidoMaterno}
                    onChange={handleClienteChange}
                    placeholder="Ingrese el appelido materno de la clienta"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDireccion">
                  <Form.Label style={{ marginBottom: "8px" }}>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleClienteChange}
                    placeholder="Ingrese la dirección del cliente"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formTelefono">
                  <Form.Label style={{ marginBottom: "8px" }}>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleClienteChange}
                    placeholder="Ingrese el teléfono del cliente"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formFecha">
                  <Form.Label style={{ marginBottom: "8px" }}>
                    Fecha de inicio del crédito
                  </Form.Label>
                  <br />
                  <DatePicker
                    selected={fecha}
                    onChange={handleFechaChange}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCredito">
                  <Form.Label style={{ marginBottom: "8px" }}>
                    Monto del crédito
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="credito"
                    value={cliente.credito}
                    onChange={handleClienteChange}
                    placeholder="Ingrese el monto del crédito"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <h4>Aval</h4>
                <Form.Group controlId="formNombreAval">
                  <Form.Label style={{ marginBottom: "8px" }}>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={aval.nombre}
                    onChange={handleAvalChange}
                    placeholder="Ingrese el nombre de la aval"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formAvalApellidoPaterno">
                  <Form.Label style={{ marginBottom: "8px" }}>Apellido Paterno</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidoPaterno"
                    value={aval.apellidoPaterno}
                    onChange={handleAvalChange}
                    placeholder="Ingrese el apellido paterno de la aval"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formAvalApellidoMaterno">
                  <Form.Label style={{ marginBottom: "8px" }}>Apellido Materno</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidoMaterno"
                    value={aval.apellidoMaterno}
                    onChange={handleAvalChange}
                    placeholder="Ingrese el apellido materno"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDireccionAval">
                  <Form.Label style={{ marginBottom: "8px" }}>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={aval.direccion}
                    onChange={handleAvalChange}
                    placeholder="Ingrese la dirección del aval"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formTelefonoAval">
                  <Form.Label style={{ marginBottom: "8px" }}>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={aval.telefono}
                    onChange={handleAvalChange}
                    placeholder="Ingrese el teléfono del aval"
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit" style={{ position: 'relative', left: '1%', marginTop: '30px', transform: "scale(1.2)" }}>
              Registrar clienta
            </Button>
            
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Register;
