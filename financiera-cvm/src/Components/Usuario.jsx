import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserInformation = () => {
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
        maxWidth:'60%',
        marginTop:'10%'
      }}
    >
      <Row>
        <Col xs={12} md={4} className="mb-4" style={{marginLeft:'20px'}}>
          <FontAwesomeIcon icon={faUser} size="6x" style={{marginBottom:'30px'}} />
          <h4>ID: 12345</h4>
          <h4>Nombre: John Doe</h4>
          <h4>Teléfono: 123456789</h4>
          
        </Col>
        <Col xs={12} md={5}>
          <h4>Modificar contraseña:</h4>
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
            <Button type="submit" className="mt-3">
              Cambiar contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInformation;
