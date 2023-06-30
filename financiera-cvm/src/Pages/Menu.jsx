import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUsers,
  faUser,
  faMoneyBill,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Menu = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    // Mostrar Sweet Alert al cerrar sesión desde el menú
    Swal.fire({
      icon: "info",
      title: "¡Hasta pronto!",
      text: "Has cerrado sesión exitosamente",
    }).then(() => {
      // Implementar el código para cerrar sesión aquí
      console.log("Cerrar sesión");
    });
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "-4px",
        }}
      >
        <div
          style={{
            backgroundImage: 'url("src/img/MenuNAV.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "320px",
          }}
        ></div>
        <Button
         as={Link}
         to="/"
          onClick={handleLogout}
          variant="primary"
          style={{
            backgroundColor: "#003559",
            position: "absolute",
            top: "50px",
            left: "45px",
            transform: "scale(2.5)",
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>
        <Button
          as={Link}
          to="user"
          style={{
            backgroundColor: "#003559",
            position: "absolute",
            top: "50px",
            right: "45px",
            transform: "scale(2.5)",
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </div>

      <Container
        style={{
          display: "flex",
          flexDirection: windowWidth >= 768 ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "30vh",
          marginTop: "100px",
        }}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: windowWidth >= 768 ? "0" : "20px",
            marginTop:'5%'
          }}
        >
          <Col as={Link} to="coordinadoras">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#003559",
                fontSize: "16pt",
                borderRadius: "25px",
                padding: "15px",
                margin: ".2rem",
                marginLeft:'0rem',
                width: "300px",
                height: "300px",
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "5px" }}
                size="10x"
              />
              <br />Coordinadoras
            </Button>
          </Col>
          <Col as={Link} to="clientas">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#003559",
                fontSize: "16pt",
                borderRadius: "25px",
                padding: "15px",
                margin: ".2rem",
                width: "300px",
                height: "300px",
              }}
            >
              <FontAwesomeIcon
                icon={faUsers}
                style={{ marginRight: "5px" }}
                size="10x"
              />
              <br /> Clientas
            </Button>
          </Col>
          <Col as={Link} to="registroclientas">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#003559",
                fontSize: "16pt",
                borderRadius: "25px",
                padding: "15px",
                margin: ".2rem",
                width: "300px",
                height: "300px",
              }}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                style={{ marginRight: "5px" }}
                size="10x"
              />
              <br /> Agregar
            </Button>
          </Col>
          <Col as={Link} to="pagos">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#003559",
                fontSize: "16pt",
                borderRadius: "25px",
                padding: "15px",
                margin: ".2rem",
                width: "300px",
                height: "300px",
              }}
            >
              <FontAwesomeIcon
                icon={faMoneyBill}
                style={{ marginRight: "5px" }}
                size="10x"
              />
              <br /> Pagos
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Menu;
