import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";
// import privacyPolicy from "../assets/Privacy-Policy.docx";

const Footer = () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let year = dateObj.getUTCFullYear();

  let newdate = month + "/" + year;
  return (
    <footer className="footer-container">
      <Row style={{ fontFamily: "sans-serif", fontSize: ".75em" }}>
        <Col className="text-center py-3 ">
          <p>
            Copyright &copy;{" "}
            <a
              className=""
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
            <Link to="/support">Contact Us</Link>
          </p>
          <p>
            View our{" "}
            <a
              // href={privacyPolicy}
              download
              target="_blank"
              rel="noreferrer"
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
