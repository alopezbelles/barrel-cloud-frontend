import React, { useEffect, useState } from "react";
import { getAll, updateBooking, deleteBooking } from "../../Services/ApiCalls";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

// STYLES AND ASSETS
import "./BookingsList.css";

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    getAll()
      .then((data) => {
        setBookings(data);
        setSelectedStatuses(data.map((booking) => booking.status));
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

    updateBooking(bookingId, selectedStatus)
      .then((data) => {
        console.log(data);
        fetchBookings();
        setShowUpdateAlert(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    deleteBooking(bookingToDelete)
      .then((data) => {
        console.log(data);
        fetchBookings();
      })
      .catch((error) => {
        console.error(error);
      });

    setShowDeleteAlert(false);
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false);
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
    <Container id="bookingList" className="containerBookingList">
      <h2>BOOKINGS LIST</h2>
      <p style={{ margin: "2em" }}>
        The list of bookings is shown below. Each one shows its description,
        creation date, and current status. You can change the status value, or
        delete the bookings.
      </p>
      {showDeleteAlert && (
        <Alert variant="warning" onClose={cancelDelete} dismissible>
          <Alert.Heading>
            Are you sure you want to eliminate the booking?
          </Alert.Heading>
          <p>
            This action cannot be undone. Please confirm if you want to proceed
            with the deletion.
          </p>
          <div className="d-flex justify-content-end">
            <Button onClick={confirmDelete} variant="danger" className="me-2">
              YES
            </Button>
            <Button onClick={cancelDelete} variant="secondary">
              NO
            </Button>
          </div>
        </Alert>
      )}
      {showUpdateAlert && (
        <Alert
          variant="success"
          onClose={() => setShowUpdateAlert(false)}
          dismissible
        >
          <Alert.Heading>Booking successfully updated</Alert.Heading>
        </Alert>
      )}
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
                <div>
                  <Button
                    className="buttonDesign"
                    onClick={() => handleUpdate(booking.id_book, index)}
                    data-id={booking.id}
                  >
                    Update
                  </Button>
                  <Button
                    className="buttonDesign"
                    onClick={() => handleDelete(booking.id_book)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default BookingsList;
