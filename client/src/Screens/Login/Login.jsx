import React, { useEffect, useState } from "react";
import "./Login.css";
import Meta from "../../Components/Meta";
import { Button, Col, Container, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../Components/FormContainer";
import Loader from "../../Components/Loader";
import { login } from "../../Actions/Auth/login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // component state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // App state
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container fluid className="wrapper">
      <Meta title={`Tweetr | Login`} />
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <div className="loginContainer">
            <h1
              style={{
                fontWeight: "bold",
                paddingBottom: "2%",
                color: "var(--bs-primary)",
              }}
            >
              Login
            </h1>
            <Form onSubmit={submitHandler} className="form form-container">
              <Form.Group controlId="email">
                <FloatingLabel
                  controlId="floating-email"
                  label="Email Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={email}
                    placeholder="username"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="password">
                <FloatingLabel label="Password" controlId="floating-password">
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <div style={{ width: "100%", margin: "2% 0" }}>
                <Button
                  type="submit"
                  className="login-button"
                  style={{ width: "50%" }}
                >
                  Sign-In
                </Button>
              </div>
            </Form>
          </div>
        )}

        <Container style={{ paddingTop: "5%" }}>
          <Link
            style={{ textDecoration: "none" }}
            className="gradient-text"
            to="/resetpassword"
          >
            <span>Forgot Password</span>
          </Link>
        </Container>
        <Col
          style={{
            margin: "2%",
            padding: "10px",
            borderTop: "1px solid #e6e6e6",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 100,
              paddingRight: "40px",
              fontFamily: "sans-serif",
            }}
          >
            Not a user yet?
          </span>
          <Link
            style={{ textDecoration: "none" }}
            className="gradient-text"
            to="/auth/register"
          >
            <span
              style={{
                fontSize: "1.5em",
                fontWeight: "900",
                padding: "5px 10px 5px 10px",
                borderRadius: "5px",
                color: "var(--bs-primary)",
              }}
            >
              Register!
            </span>
          </Link>
        </Col>
      </FormContainer>
    </Container>
  );
};

export default Login;
