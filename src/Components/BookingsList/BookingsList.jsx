import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

// STYLES AND ASSETS
import "./BookingsList.css";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("http://localhost:3656/getall")
      .then((response) => {
        setBookings(response.data);
        setSelectedStatuses(response.data.map((booking) => booking.status));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStatusChange = (event, index) => {
    const newSelectedStatuses = [...selectedStatuses];
    newSelectedStatuses[index] = event.target.value;
    setSelectedStatuses(newSelectedStatuses);
  };

  const handleUpdate = (bookingId, index) => {
    const selectedStatus = selectedStatuses[index];

    axios
      .put("http://localhost:3656/update", {
        id: bookingId,
        status: selectedStatus,
      })
      .then((response) => {
        console.log(response.data);
        fetchBookings();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (bookingId) => {
    console.log(bookingId);
    axios
      .delete("http://localhost:3656/delete", { data: { id: bookingId } })
      .then((response) => {
        console.log(response.data);
        fetchBookings();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTimeString).toLocaleString("es-ES", options);
  };

  return (
    <Container className="containerBookingList">
      <h2>BOOKINGS LIST</h2>
      <p>
        The list of reservations is shown below. Each one shows its description,
        creation date, and current status. You can change the status value, or
        delete the reservation.{" "}
      </p>
      <ul style={{ listStyleType: "none" }}>
        {bookings.map((booking, index) => (
          <li key={booking.id}>
            <Row>
              <Col className="col1Bookings">{booking.description}</Col>
              <Col className="col2Bookings">
                {formatDateTime(booking.createdAt)}
              </Col>
              <Col className="col3Bookings">
                <Form.Select
                  className="formSelectDesign"
                  value={selectedStatuses[index]}
                  onChange={(event) => handleStatusChange(event, index)}
                  data-id={booking.id}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="canceled">Canceled</option>
                </Form.Select>
                <Button
                  className="buttonDesign"
                  onClick={() => handleUpdate(booking.id_book, index)}
                  data-id={booking.id}
                >
                  Actualizar
                </Button>
                <Button
                  className="buttonDesign"
                  onClick={() => handleDelete(booking.id_book)}
                  variant="danger"
                >
                  Eliminar
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
