import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import Swal from "sweetalert2";
import TablaAval from "../Components/TablaAval";
import Estado from "./EstadoDeCliente";
import Modificar from "./Modificar";

function Infor() {
  const [showComponent, setShowComponent] = useState(null);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3000/clientas';
        if (searchText) {
          url = `http://localhost:3000/clientas/${searchText}`;
        }
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los registros:', error);
      }
    };

    fetchData();
  }, [searchText]);

  const handleAvalClick = () => {
    setShowComponent("Aval");
    setShowBackButton(true);
    // Aquí puedes realizar alguna lógica adicional con el ID del cliente
  };

  const handleEstadoClick = () => {
    setShowComponent("Estado");
    setShowBackButton(true);
    // Aquí puedes realizar alguna lógica adicional con el ID del cliente
  };

  const handleModificarClick = () => {
    setShowComponent("Modificar");
    setShowBackButton(true);
    // Aquí puedes realizar alguna lógica adicional con el ID del cliente
  };

  const handleLiquidarCuentaClick = (id_cliente) => {
    Swal.fire({
      title: "¿Estás seguro que deseas liquidar la cuenta?",
      text: "Los datos del cliente serán eliminados permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, liquidar cuenta",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes implementar la lógica para borrar los datos del cliente
        setData(data.filter((item) => item.id_cliente !== id_cliente));
        setShowBackButton(true);
        Swal.fire(
          "Cuenta liquidada",
          "Los datos del cliente han sido eliminados.",
          "success"
        );
      }
    });
  };

  const handleBackClick = () => {
    setShowComponent(null);
    setShowBackButton(false);
  };

  const filteredData = data.filter((item) =>
    item.nombre_cliente.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="container mt-5">
        {showBackButton && (
          <div>
            <Button variant="secondary" onClick={handleBackClick}>
              Volver
            </Button>
          </div>
        )}

        {showComponent === null ? (
          <div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Buscar por nombre..."
                  className="form-control"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>ID cliente</th>
                    <th>Nombre(s)</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id_cliente}>
                      <td>{item.id_cliente}</td>
                      <td>{item.nombre_cliente}</td>
                      <td>{item.direccion}</td>
                      <td>{item.telefono}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            variant="primary"
                            onClick={() => handleAvalClick(item.id_cliente)}
                            style={{
                              marginLeft: "0px",
                              backgroundColor: "#003559",
                              borderRadius: "15px",
                            }}
                          >
                            Aval
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEstadoClick(item.id_cliente)}
                            style={{
                              marginLeft: "20px",
                              backgroundColor: "#003559",
                              borderRadius: "15px",
                            }}
                          >
                            Estado
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleModificarClick(item.id_cliente)}
                            style={{
                              marginLeft: "20px",
                              backgroundColor: "#003559",
                              borderRadius: "15px",
                              marginRight: "0px",
                            }}
                          >
                            Modificar
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleLiquidarCuentaClick(item.id_cliente)}
                            style={{
                              marginLeft: "20px",
                              backgroundColor: "#dc3545",
                              borderRadius: "15px",
                              marginRight: "0px",
                            }}
                          >
                            Liquidar cuenta
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          <div>
            {showComponent === "Aval" && (
              <div>
                <TablaAval />
              </div>
            )}
            {showComponent === "Estado" && (
              <div>
                <Estado
                  data={{
                    nombre: "Nombre del cliente",
                    id: 1,
                    direccion: "Dirección del cliente",
                    telefono: "Teléfono del cliente",
                    fechaInicio: "Fecha de inicio del crédito",
                    semanaPago: "Semana de pago",
                    deuda: "Deuda",
                    deudaMoratorios: "Deuda con moratorios",
                  }}
                />
              </div>
            )}
            {showComponent === "Modificar" && (
              <div>
                <Modificar />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Infor;
