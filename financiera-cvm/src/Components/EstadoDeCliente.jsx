import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const EstadoClienteComponent = ({ data }) => {
  return (
    <div style={{marginTop:'30px'}}>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <div
          className="w-100"
          style={{
            backgroundColor: "#003559",
            padding: "40px",
            borderRadius: "15px",
            color: "#fff",
            maxWidth: "100%",
            maxHeight: "100%",
            marginTop: "-10px",
            marginBottom: "2%",
            fontSize:'20pt'
          }}
        >
          <h2>Estado del Cliente</h2>
          <Row>
            <Col md={6}>
              <p>Nombre: {data.nombre}</p>
              <p>ID: {data.id}</p>
              <p>Dirección: {data.direccion}</p>
              <p>Teléfono: {data.telefono}</p>
            </Col>
            <Col md={6}>
              <p>Fecha de inicio del crédito: {data.fechaInicio}</p>
              <p>Semana de pago: {data.semanaPago}</p>
              <p>Deuda: {data.deuda}</p>
              <p>Deuda con moratorios: {data.deudaMoratorios}</p>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default EstadoClienteComponent;
