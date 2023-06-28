import React, { useState } from "react";

import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import axios from "axios";

// STYLES AND AESSETS
import "./AddBook.css";

function AddBook() {
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      axios
        .post("http://localhost:3656/newbooking", {
          description: description,
          status: status,
        })
        .then((response) => {
          console.log(response.data);
          setShowSuccessAlert(true); // Mostrar el mensaje de éxito
          setDescription(""); // Limpiar el campo de descripción
          setStatus(""); // Restablecer el estado del select
  
          // Esperar 2 segundos y luego recargar la página
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <Container className="container">
        <h2>ADD BOOKING</h2>
        {showSuccessAlert && (
          <Alert
            variant="success"
            onClose={() => setShowSuccessAlert(false)}
            dismissible
          >
            Registro añadido con éxito
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row className="rowListDesign">
            <Col>
              <Form.Control
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={handleDescriptionChange}
              />
            </Col>
            <Col>
              <Form.Select
                className="booking"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="">Seleccionar estado</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </Form.Select>
            </Col>
            <Col>
              <Button type="submit" className="booking">
                Añadir reserva
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

export default AddBook;
