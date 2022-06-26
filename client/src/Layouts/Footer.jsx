import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import privacyPolicy from "../assets/Privacy-Policy.docx";

const Footer = () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let year = dateObj.getUTCFullYear();

  let newdate = month + "/" + year;
  return (
    <footer>
      <Row style={{ fontFamily: "sans-serif", fontSize: ".75em" }}>
        <Col
          className="text-center py-3 trim-dark-bg "
          style={{
            backgroundColor: "var(--bs-gray-dark)",
            color: "var(--bs-secondary)",
          }}
        >
          <p className="secondary-txt" style={{}}>
            Copyright &copy;{" "}
            <a
              style={{ color: "var(--bs-primary)" }}
              href="https://wulfdevpage.azurewebsites.net/"
              target="_blank"
              rel="noreferrer"
            >
              WulfDevelopments
            </a>{" "}
            {newdate}
          </p>
          <p className="secondary-txt">
            If you are experiencing any issues with the app please{" "}
            <Link to="/support" style={{ color: "var(--bs-warning)" }}>
              Contact Us
            </Link>
          </p>
          <p>
            View our{" "}
            <a
              // href={privacyPolicy}
              download
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--bs-warning)" }}
            >
              Privacy Policy
            </a>
          </p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
