import React from "react";
import { Container, Row } from "react-bootstrap";
import Meta from "../../Components/Meta";

const InboxScreen = () => {
  return (
    <Container>
      <Meta title="Inbox" />
      <Row>
        <h1>Inbox</h1>
      </Row>
      <Container fluid>
        <h2>Messages</h2>
      </Container>
    </Container>
  );
};

export default InboxScreen;
