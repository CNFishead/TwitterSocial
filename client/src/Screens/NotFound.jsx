import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Meta from "../Components/Meta";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(10);
  const timer = setTimeout(() => {
    setCount(count - 1);
  }, [1000]);
  useEffect(() => {
    const autoNav = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => {
      clearTimeout(autoNav);
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <>
      <Meta title={`Truthcasting | 404 Page not Found`} />
      <Container style={{ margin: "15% auto", textAlign: "center" }}>
        <Row className="not-found-container container">
          <Col>
            <h1>404 - Page Not Found</h1>
            <p className="not-found-pathname">
              The page at: {location.pathname}
            </p>
            <p>
              You will be redirected to <Link to="/">Homepage</Link> in {count}s
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
