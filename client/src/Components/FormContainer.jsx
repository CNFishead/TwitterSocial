import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container style={{ padding: "2.5%", textAlign: "center" }}>
      <Row className="justify-content-md-center">
        <Col lg={8}>{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
