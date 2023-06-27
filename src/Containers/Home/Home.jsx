import React from "react";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

// STYLES AND ASSETS
import "./Home.css";
import Background from "../../Assets/trip-wise-background.png";
import BookingsList from "../../Components/BookingsList/BookingsList";

function Home() {
  return (
    <Container fluid className="homeDesign">
      <Row className="row1Design">
        {/* <Image src={Background} alt="Background" style={{ width: "100%", height: "100%", objectFit: "cover" }}></Image> */}
        <Col className="col1Design"></Col>
      </Row>
      <Row className="row2Design">
      <BookingsList></BookingsList>
      
      </Row>
    </Container>
  );
}

export default Home;
