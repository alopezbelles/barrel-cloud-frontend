import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import axios from "axios";

// STYLES AND AESSETS
import "./BookingsList.css";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    // Realizar la llamada a la API para obtener el listado de reservas
    fetch("http://localhost:3656/getall")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdate = (bookingId) => {
    // Realizar la llamada a la API para actualizar el registro con bookingId
    fetch(`http://localhost:3656/update/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: selectedStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualizar el estado local si es necesario
        console.log(data); // Mostrar la respuesta de la API en la consola
      })
      .catch((error) => {
        console.error(error); // Manejar errores de la llamada a la API
      });
  };

  return (
    <Container>
      <h2>Listado de Reservas</h2>
      <ul style={{ listStyleType: "none" }}>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <Row className="rowListDesign">
              <Col>{booking.description}</Col>
              <Col>{booking.createdAt}</Col>
              <Col>
                <Form.Select
                  value={booking.status}
                  onChange={handleStatusChange}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </Form.Select>
              </Col>
              <Col>
                <Button onClick={() => handleUpdate(booking.id)}>
                  Actualizar
                </Button>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default BookingsList;
