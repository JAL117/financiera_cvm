import React, { useState, useEffect } from "react";
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowLeft,
  faSignOutAlt,
  faUsers,
  faUser,
  faUserPlus,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import img2 from "../img/logo_2.png";
import Swal from "sweetalert2";

const NavbarComponent = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showUserButton, setShowUserButton] = useState(false);

  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const toggleUserButton = () => {
    setShowUserButton(!showUserButton);
  };

  const handleLogout = () => {
    // Mostrar Sweet Alert al cerrar sesión
    Swal.fire({
      icon: "info",
      title: "¡Hasta pronto!",
      text: "Has cerrado sesión exitosamente",
    }).then(() => {
      // Implementar el código para cerrar sesión aquí
      console.log("Cerrar sesión");
    });
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setShowOffcanvas(false);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="navbar-expand-lg">
      <Button
        as={Link}
        to="/inicio"
        className="navbar-button"
        style={{
          marginLeft: "5%",
          backgroundColor: "#003559",
          transform: "scale(1.5)",
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#fff" }} />
      </Button>

      <Navbar.Brand as={Link} to="/inicio" className="navbar-brand">
        <img
          src={img2}
          className="navbar-logo"
          alt="Imagen 2"
          style={{ marginLeft: "15%", maxHeight: "100%", height: "100%" }}
        />
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={toggleOffcanvas}
      >
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>

      <Navbar.Collapse id="responsive-navbar-nav" style={{ marginLeft: "25%" }}>
        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/inicio/coordinadoras"
            onClick={toggleOffcanvas}
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ marginRight: "5px" }}
              size="3x"
            />
            Coordinadoras
          </Nav.Link>
          <Nav.Link as={Link} to="/inicio/clientas" onClick={toggleOffcanvas}>
            <FontAwesomeIcon
              icon={faUsers}
              style={{ marginRight: "5px" }}
              size="3x"
            />
            Clientas
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/inicio/registroclientas"
            onClick={toggleOffcanvas}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ marginRight: "5px" }}
              size="3x"
            />
            Agregar
          </Nav.Link>
          <Nav.Link as={Link} to="/inicio/pagos" onClick={toggleOffcanvas}>
            <FontAwesomeIcon
              icon={faMoneyBill}
              style={{ marginRight: "5px" }}
              size="3x"
            />
            Pagos
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            title={
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#003559" }}
                size="3x"
              />
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to="/inicio/user"
              onClick={toggleOffcanvas}
              style={{ backgroundColor: "#003559", color: "white" }}
            >
              Información del Usuario
            </NavDropdown.Item>
            <NavDropdown.Divider
            />
            <NavDropdown.Item
              onClick={handleLogout}
              as={Link}
              to="/"
              style={{ backgroundColor: "#003559", color: "white" }}
            >
              Cerrar sesión
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginLeft: "5px" }}
              />
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
