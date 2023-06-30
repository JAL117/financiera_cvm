import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const Modificar = () => {
  const [clienteModificado, setClienteModificado] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    credito: "",
  });
  const [avalModificado, setAvalModificado] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const [fechaModificada, setFechaModificada] = useState(new Date());

  const handleClienteModificadoChange = (e) => {
    setClienteModificado({
      ...clienteModificado,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvalModificadoChange = (e) => {
    setAvalModificado({ ...avalModificado, [e.target.name]: e.target.value });
  };

  const handleFechaModificadaChange = (date) => {
    setFechaModificada(date);
  };

  const handleModificar = (e) => {
    e.preventDefault();

    const fechaSeleccionada = fechaModificada.toISOString();

    console.log("Cliente modificado:", clienteModificado);
    console.log("Aval modificado:", avalModificado);
    console.log("Fecha modificada:", fechaSeleccionada);

    setClienteModificado({
      nombre: "",
      direccion: "",
      telefono: "",
      credito: "",
    });
    setAvalModificado({
      nombre: "",
      direccion: "",
      telefono: "",
    });
    setFechaModificada(new Date());
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
      >
        <div
          className="w-100"
          style={{
            width: "800px",
            backgroundColor: "#003559",
            padding: "30px",
            borderRadius: "15px",
            color: "#fff",
          }}
        >
          <h2>Modificar</h2>
          <Form onSubmit={handleModificar}>
            <Row>
              <Col>
                <Form.Group controlId="formClienteModificado">
                  <Form.Label style={{ marginTop: "20px" }}>Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del cliente"
                    name="nombre"
                    value={clienteModificado.nombre}
                    onChange={handleClienteModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Dirección del cliente"
                    name="direccion"
                    value={clienteModificado.direccion}
                    onChange={handleClienteModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Teléfono del cliente"
                    name="telefono"
                    value={clienteModificado.telefono}
                    onChange={handleClienteModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Crédito del cliente"
                    name="credito"
                    value={clienteModificado.credito}
                    onChange={handleClienteModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAvalModificado">
                  <Form.Label style={{ marginTop: "20px" }}>Aval</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del aval"
                    name="nombre"
                    value={avalModificado.nombre}
                    onChange={handleAvalModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Dirección del aval"
                    name="direccion"
                    value={avalModificado.direccion}
                    onChange={handleAvalModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Teléfono del aval"
                    name="telefono"
                    value={avalModificado.telefono}
                    onChange={handleAvalModificadoChange}
                    style={{ marginTop: "20px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group
              controlId="formFechaModificada"
              style={{ marginTop: "20px" }}
            >
              <Form.Label>Fecha de inicio del crédito</Form.Label>
              <br />
              <DatePicker
                selected={fechaModificada}
                onChange={handleFechaModificadaChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "80%" }}
            >
              {" "}
              Modificar
            </Button>
         
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Modificar;
