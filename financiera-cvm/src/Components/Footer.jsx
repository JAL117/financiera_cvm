import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-light" style={{ marginTop: "15%" , backgroundColor:'#003559' }}>
      <Container>
        <h1>Hola</h1>
        <Row style={{ padding: "20px" }}>
          <Col md={4}>
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li>
                <Button
                  className="ml-2"
                  as={Link}
                  to="https://www.cvm.com.mx/contacto"
                  style={{ marginRight: "5%" }}
                >
                  <FontAwesomeIcon icon={faLocationArrow} />
                  Pagina
                </Button>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Developers</h5>
            <ul>
              <li style={{marginBottom:'2%'}}>
                <Button>
                  <FontAwesomeIcon icon={faCircleUser} />
                  Michel Jovanny
                </Button>
              </li>
              <li style={{marginBottom:'2%'}}>
                <Button>
                  <FontAwesomeIcon icon={faCircleUser} />
                  Jose Julian
                </Button>
              </li>
              <li>
                <Button>
                  <FontAwesomeIcon icon={faCircleUser} />
                  Jose Alberto
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <p>
          &copy; {new Date().getFullYear()} CVM. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
