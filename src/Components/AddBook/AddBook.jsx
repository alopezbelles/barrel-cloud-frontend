import React, { useState } from "react";
import { addBooking } from "../../Services/ApiCalls";
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

    const bookingData = {
      description: description,
      status: status,
    };

    addBooking(bookingData)
      .then((data) => {
        console.log(data);
        setShowSuccessAlert(true);
        setDescription("");
        setStatus("");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container id="addBooking" className="containerBooking">
      <h2>ADD BOOKING</h2>
      <p style={{ margin: "2em" }}>
        You can add a new bookings to the database, including the description of
        the booking and its initial status. You can change the values in the
        booking list later.
      </p>
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Registro añadido con éxito
        </Alert>
      )}
      <div className="divForm">
        <Form onSubmit={handleSubmit}>
          <Row className="rowListDesign">
            <Col className="colFormDesign">
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </Col>
            <Col>
              <Form.Select value={status} onChange={handleStatusChange}>
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </Form.Select>
            </Col>
            <Col>
              <Button type="submit" className="booking">
                Add Booking
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default AddBook;
