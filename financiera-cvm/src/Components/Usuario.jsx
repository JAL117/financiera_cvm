import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const UserInformation = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para cambiar la contraseña del usuario
    console.log("Contraseña actual:", currentPassword);
    console.log("Nueva contraseña:", newPassword);
    // Restablecer los campos de contraseña después de cambiarla
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#003559",
        color: "white",
        padding: "30px",
        borderRadius: "25px",
        maxWidth: isTabletOrMobile ? "100%" : "60%",
        marginTop: "10%",
        transform: isTabletOrMobile ? "" : "scale(1.5)"
      }}
    >
      <Row>
        <Col xs={12} md={4} className="mb-4">
          <div style={{ textAlign: "start", marginBottom: "30px" }}>
            <FontAwesomeIcon icon={faUser} size="4x" />
          </div>
          <div>
            <p>ID: 12345</p>
            <p>Nombre: John Doe</p>
            <p>Correo: dksldkl@gmial.com</p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <h4 style={{ marginBottom: "15px" }}>Modificar contraseña:</h4>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group controlId="currentPassword">
              <Form.Label>Contraseña actual:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>Nueva contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-4">
              Cambiar contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInformation;
