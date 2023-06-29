import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function Aval() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Datos de ejemplo
      const sampleData = [
        {
          id: 1,
          nombre: "Maria del carmen hernandez luna",
          direccion: "5ta poniente entre 5ta y 6tsa norte barrio hunion hidalgo",
          telefono: "9686896942",
        }
      ];

      // Simulación de solicitud a la base de datos
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: sampleData }), 1000)
      );

      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <div
          className="w-100"
          style={{
            width: "400px",
            height: "300px",
            backgroundColor: "#003559",
            padding: "30px",
            borderRadius: "15px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth:'70%',
            fontSize:'16pt'
          }}
        >
          <h2>Aval</h2>
          {data.map((item) => (
            <div key={item.id} style={{ margin: "10px 0" }}>
              <p>ID: {item.id}</p>
              <p>Nombre: {item.nombre}</p>
              <p>Dirección: {item.direccion}</p>
              <p>Teléfono: {item.telefono}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Aval;
