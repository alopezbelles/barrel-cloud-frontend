import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import axios from "axios";

// STYLES AND AESSETS
import "./BookingsList.css";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener el listado de reservas
    axios
      .get("http://localhost:3656/getall")
      .then((response) => {
        setBookings(response.data);
        setSelectedStatuses(response.data.map((booking) => booking.status));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleStatusChange = (event, index) => {
    const newSelectedStatuses = [...selectedStatuses];
    newSelectedStatuses[index] = event.target.value;
    setSelectedStatuses(newSelectedStatuses);
  };

  const handleUpdate = (bookingId, index) => {
    const selectedStatus = selectedStatuses[index];
  
    // Realizar la llamada a la API para actualizar el registro con bookingId
    axios
      .put("http://localhost:3656/update", {
        id: bookingId,
        status: selectedStatus,
      })
      .then((response) => {
        console.log(response.data);
  
        // Actualizar el estado local directamente
        const updatedBookings = [...bookings]; // Crear una copia del array de reservas
        updatedBookings[index].status = selectedStatus; // Actualizar el estado de la reserva en la copia
        setBookings(updatedBookings); // Actualizar el estado local con la copia actualizada
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <h2>Listado de Reservas</h2>
      <ul style={{ listStyleType: "none" }}>
        {bookings.map((booking, index) => (
          <li key={booking.id}>
            <Row className="rowListDesign">
              <Col>{booking.description}</Col>
              <Col>{booking.createdAt}</Col>
              <Col>
                <Form.Select
                  value={selectedStatuses[index]}
                  onChange={(event) => handleStatusChange(event, index)}
                  data-id={booking.id}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </Form.Select>
                <Button
                  onClick={() => handleUpdate(booking.id, index)}
                  data-id={booking.id}
                >
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
