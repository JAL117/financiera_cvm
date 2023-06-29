import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PagosComponente() {
  const [pagos, setPagos] = useState([
    {
      id: 1,
      idcliente: 123,
      nombre: "Jose Alberto Morales Solorzano",
      direccion: "5ta Poniente entre 5ta y 6ta Norte",
      telefono: "9686896942",
      fecha: "2023-06-10",
      credito: 1000,
      total: 500,
      pagado: true,
      moratorio: false,
      numeroPago: 1,
    },
    {
      id: 2,
      idcliente: 1235,
      nombre: "Michel",
      direccion: "5ta Poniente entre 5ta y 6ta Norte",
      telefono: "9686896942",
      fecha: "2023-06-10",
      credito: 1000,
      total: 500,
      pagado: true,
      moratorio: false,
      numeroPago: 1,
    },
    // Agrega más datos de ejemplo según sea necesario
  ]);

  const [searchText, setSearchText] = useState("");
  const [orientation, setOrientation] = useState(""); // Variable de estado para la orientación del PDF


  const handlePagoChange = (id) => {
    const pago = pagos.find((pago) => pago.id === id);
  
    Swal.fire({
      title: "Confirmar pago",
      html: `
        <p>Ingresa la fecha de pago:</p>
        <input type="date" id="fechaPago" required>
        <p>¿Se ha pagado moratorio?</p>
        <select id="moratorio">
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const fechaPago = document.getElementById("fechaPago").value;
        const moratorio = document.getElementById("moratorio").value === "true";
  
        // Validar que se haya seleccionado una fecha
        if (!fechaPago) {
          Swal.showValidationMessage("Por favor, selecciona una fecha de pago");
          return false;
        }
  
        const currentDate = new Date().toISOString().slice(0, 10);
        const moratorioFinal = fechaPago !== currentDate || moratorio;
  
        const updatedPagos = pagos.map((pago) => {
          if (pago.id === id) {
            return { ...pago, pagado: true, moratorio: moratorioFinal };
          }
          return pago;
        });
        setPagos(updatedPagos);
        Swal.fire(
          "¡Pagado!",
          `${pago.nombre} ha sido marcado como pagado.`,
          "success"
        );
      },
    }).then((result) => {
      if (result.isDismissed) {
        Swal.fire("Cancelado", "El pago no ha sido confirmado.", "warning");
      }
    });
  };
  
  


  const handleNumeroPagoChange = (id, numeroPago) => {
    if (numeroPago >= 1 && numeroPago <= 14) {
      const updatedPagos = pagos.map((pago) => {
        if (pago.id === id) {
          return { ...pago, numeroPago };
        }
        return pago;
      });
      setPagos(updatedPagos);
    } else {
     
      alert("El número de pago debe ser un valor entre 1 y 14.");
    }
  };

  const filteredPagos = pagos.filter((pago) =>
    pago.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOrientationChange = () => {
    Swal.fire({
      title: "Seleccionar orientación",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Vertical",
      cancelButtonText: "Horizontal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setOrientation("portrait");
        generatePDF("portrait");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setOrientation("landscape");
        generatePDF("landscape");
      }
    });
  };

  const generatePDF = (orientation) => {
    const tableRows = filteredPagos.map((pago) => [
      pago.idcliente,
      pago.nombre,
      pago.direccion,
      pago.telefono,
      pago.credito,
      pago.total,
      pago.numeroPago,
      pago.fecha,
    ]);
  
    const table = {
      table: {
        widths: [
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
        ],
        body: [
          [
            { text: "ID cliente", style: "tableHeader" },
            { text: "Nombre", style: "tableHeader" },
            { text: "Direccion", style: "tableHeader" },
            { text: "Telefono", style: "tableHeader" },
            { text: "Crédito", style: "tableHeader" },
            { text: "Total a pagar", style: "tableHeader" },
            { text: "Semana de pago", style: "tableHeader" },
            { text: "Fecha de pago", style: "tableHeader" },
          ],
          ...tableRows,
        ],
      },
    };
  
    const documentDefinition = {
      content: [
        {
          text: "Reporte semanal de clientas que faltan por pagar:",
          style: "header",
        },
        table,
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fillColor: "#003559",
          color:"#FFFFFF",
        },
      },
      pageOrientation: orientation,
    };
  
    pdfMake.createPdf(documentDefinition).download("reporte.pdf");
  };
  
  return (
    <div>
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-end align-items-center">
            <Button
              variant="primary"
              onClick={handleOrientationChange}
              style={{ backgroundColor: "#003559" }}
            >
              Generar PDF
              <FontAwesomeIcon icon={faDownload} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Crédito</th>
                <th>Total a pagar</th>
                <th>Fecha de Pago</th>
                <th>Número de pago</th>
                <th>Registrar pago</th>
              </tr>
            </thead>
            <tbody>
              {filteredPagos.map((pago) => (
                <tr key={pago.id}>
                  <td>{pago.idcliente}</td>
                  <td>{pago.nombre}</td>
                  <td>{pago.direccion}</td>
                  <td>{pago.telefono}</td>
                  <td>{pago.credito}</td>
                  <td>{pago.total}</td>
                  <td>{pago.fecha}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min={1}
                      max={14}
                      value={pago.numeroPago}
                      onChange={(e) =>
                        handleNumeroPagoChange(pago.id, e.target.value)
                      }
                    />
                  </td>     
                  <td>
                    <Button
                      style={{ backgroundColor: "#003559" }}
                      checked={pago.pagado}
                      onClick={() => handlePagoChange(pago.id)}
                    >
                      Pagado
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default PagosComponente;
