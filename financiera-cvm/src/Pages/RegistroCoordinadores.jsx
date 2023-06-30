import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterCoordinator = () => {
  const [coordinator, setCoordinator] = useState({
    nombre: "",
    correoElectronico: ""
  });

  const handleCoordinatorChange = (e) => {
    setCoordinator({ ...coordinator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar la solicitud de registro al servidor
    try {
      const response = await axios.post("http://localhost:3000/registerCoordinador", coordinator);
      console.log("Respuesta del servidor:", response.data);

      // Mostrar una alerta de éxito
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El coordinador ha sido registrado correctamente",
      });

      // Reiniciar los campos del formulario
      setCoordinator({
        nombre: "",
        correoElectronico: ""
      });
    } catch (error) {
      console.error("Error al registrar el coordinador:", error);

      // Mostrar una alerta de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el coordinador",
      });
    }
  };

  const isScreenLarge = useMediaQuery({ query: "(min-width: 1200px)" });

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh", marginTop: "3%" }}
      >
        <div
          className="w-100"
          style={{
            backgroundColor: "#003559",
            padding: "30px",
            borderRadius: "15px",
            color: "#fff",
            maxWidth: "600px",
            maxHeight: "800px",
            transform: isScreenLarge ? 'scale(1.5)' : 'none'
          }}
        >
          <Form onSubmit={handleSubmit}>
            <h4 style={{ marginBottom: "20px" }}>Registro de Coordinador</h4>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre(s)</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={coordinator.nombre}
                onChange={handleCoordinatorChange}
                placeholder="Ingrese el/los nombre(s) del coordinador"
                required
              />
            </Form.Group>
            <Form.Group controlId="formApellidoPaterno">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                name="Apellido paterno"
                value={coordinator.nombre}
                onChange={handleCoordinatorChange}
                placeholder="Ingrese el apellido paterno"
                required
              />
            </Form.Group>
            <Form.Group controlId="formApellidoMaterno">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                name="Apellido Materno"
                value={coordinator.nombre}
                onChange={handleCoordinatorChange}
                placeholder="Ingrese el apellido materno"
                required
              />
            </Form.Group>
            <Form.Group controlId="formCorreoElectronico">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correoElectronico"
                value={coordinator.correoElectronico}
                onChange={handleCoordinatorChange}
                placeholder="Ingrese el correo electrónico"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
              Registrar coordinador
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default RegisterCoordinator;
