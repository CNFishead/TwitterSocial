import React from "react";
import { Nav } from "react-bootstrap";
import { SiTwitter } from "react-icons/si";
import { Link } from "react-router-dom";
import {
  BsHouseFill,
  BsSearch,
  BsFillBellFill,
  BsEnvelope,
  BsFillPersonFill,
} from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../../Actions/Auth/logout";
import "./Navbar.css";
import { CLEAR_SELECTED_USER } from "../../Constants/userConstants";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="icon-container blue">
          <SiTwitter className="icon blue" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="icon-container">
          <BsHouseFill className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/search" className="icon-container">
          <BsSearch className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/notify" className="icon-container">
          <BsFillBellFill className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/dashboard/profile"
          className="icon-container"
          onClick={() => dispatch({ type: CLEAR_SELECTED_USER })}
        >
          <BsFillPersonFill className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/messages" className="icon-container">
          <BsEnvelope className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => dispatch(logout())} className="icon-container">
          <RiLogoutBoxRLine className="icon" />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
