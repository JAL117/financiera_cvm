import { useState } from "react";
import { Container, Form, Button, Navbar } from "react-bootstrap";
import logo from "../img/logo_2.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

const Login = () => {
  const navegacion = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [id_coordinador, setIdCoordinador] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleIdChange = (e) => {
    setIdCoordinador(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id_coordinador || !contrasena) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Por favor, ingresa tu ID y contraseña",
      });
      return;
    }

    try {
      const respuesta = await axios.post("http://localhost:3000/login", { id_coordinador, contrasena });

      navegacion("/inicio");

      // Mostrar Sweet Alert de bienvenida
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
      });

      // Cerrar el Sweet Alert después de 3 segundos
      setTimeout(() => {
        Swal.close();
      }, 800);

      console.log(respuesta);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "ID y/o contraseña incorrecto(s)",
      });
    }
  };

  return (
    <>
      <Navbar bg="transparent" variant="dark" className="justify-content-start">
        <Navbar.Brand>
          <img
            src={logo}
            width="200"
            height="70"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ marginLeft: "30px" }}
          />
        </Navbar.Brand>
      </Navbar>

      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "50vh",
          fontSize: '20pt',
          transform: isTabletOrMobile ? "" : "scale(1.5)",
          borderRadius: '25px',
          marginTop: '8%',
          backgroundColor: "#003559",
          maxWidth: isTabletOrMobile ? "100%" : "25%"
        }}
      >
        <div className="login-form-container">
          <h2 className="text-center mb-4 text-white" style={{ fontSize: '26pt' }}>Coordinadora</h2>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group controlId="formUsername" className="mb-4">
              <Form.Label className="text-white">ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu ID"
                value={id_coordinador}
                onChange={handleIdChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label className="text-white">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={handleContrasenaChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar sesión
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Login;
