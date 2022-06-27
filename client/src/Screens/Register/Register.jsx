import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../Actions/alert";
import Meta from "../../Components/Meta";
import FormContainer from "../../Components/FormContainer";
import { register } from "../../Actions/Auth/register";

const Register = () => {
  // utils
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // component state
  const [userForm, setuserForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    sex: "male",
  });
  const [passConf, setPassConf] = useState("");

  const { email, password, firstName, lastName, phoneNumber, sex, username } =
    userForm;

  //Create an api key when user registers

  // App state
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      // eslint-disable-next-line
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      password.length >= 10 &&
      password === passConf
    ) {
      dispatch(register(userForm));
    } else {
      dispatch(setAlert("Please enter valid information", "danger"));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user/profile");
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    setuserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container fluid className="wrapper">
        <Meta
          title={"Tweetr | Signup"}
          desc={"Sign up for Tweetr"}
          keywords={"signup"}
        />

        <FormContainer>
          <>
            <Form onSubmit={handleSubmit}>
              <div className="loginContainer">
                <h1
                  style={{
                    fontWeight: "bold",
                    paddingBottom: "2%",
                    color: "var(--bs-primary)",
                  }}
                >
                  Register
                </h1>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="First-Name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={firstName}
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="Last-Name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={lastName}
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        name="username"
                        placeholder="Username"
                        autofill="off"
                        onChange={handleChange}
                        required
                        minLength={3}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="User-Email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        isValid={() => {
                          // eslint-disable-next-line
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            email
                          );
                        }}
                        isInvalid={
                          // eslint-disable-next-line
                          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            email
                          )
                        }
                        name="email"
                        placeholder="name@example.com"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="UserPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        name="password"
                        isValid={password.length >= 10}
                        isInvalid={password.length < 10}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 10 characters
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="UserPassword2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={passConf}
                        isValid={passConf === password}
                        isInvalid={passConf !== password}
                        placeholder="Confirm Password"
                        onChange={(e) => setPassConf(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Must Match Password
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="phone-number">
                      <Form.Label>Phone Number</Form.Label>
                      <NumberFormat
                        type="tel"
                        name="phoneNumber"
                        value={phoneNumber}
                        format="(###)-###-####"
                        onChange={handleChange}
                        // allowEmptyFormatting={true}
                        mask="_"
                        style={{
                          display: "block",
                          width: "100%",
                          border: "1px solid #ced4da",
                          padding: "0.375rem 0.75rem",
                          borderRadius: "0.25rem",
                          color: "#212529",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <br />
                  <Form.Check
                    name="sex"
                    onChange={handleChange}
                    checked={sex === "male"}
                    value="male"
                    label="Male"
                    type="radio"
                    inline
                  />
                  <Form.Check
                    name="sex"
                    value="female"
                    onChange={handleChange}
                    checked={sex === "female"}
                    label="Female"
                    type="radio"
                    inline
                  />
                </Form.Group>
                <Row
                  className="justify-content-between"
                  style={{ marginTop: "35px" }}
                >
                  <Button
                    type="submit"
                    className=""
                    style={{ width: "40%", margin: "0 auto" }}
                  >
                    Submit form
                  </Button>
                </Row>
              </div>
            </Form>
          </>
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
              Already a member?
            </span>
            <Link
              style={{ textDecoration: "none" }}
              className="gradient-text"
              to="/auth/login"
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
                Login!
              </span>
            </Link>
          </Col>
        </FormContainer>
      </Container>
    </>
  );
};

export default Register;
