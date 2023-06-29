import React from "react";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

// STYLES AND ASSETS
import "./Home.css";
import Background from "../../Assets/trip-wise-background.png";
import BookingsList from "../../Components/BookingsList/BookingsList";
import AddBook from "../../Components/AddBook/AddBook";

function Home() {
  return (
    <Container fluid className="homeDesign">
      <Row className="row1Design">
        <Col className="col1Design"></Col>
      </Row>
      <Row className="row2Design">
        <BookingsList></BookingsList>
      </Row>
      <Row>
        <AddBook></AddBook>
      </Row>
    </Container>
  );
}

export default Home;
