import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { ReactComponent as Logo } from "../images/logo.svg";

const navbarStyle = {
  backgroundColor: "#202024",
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle}>
      <Container>
        <Logo alt={title} style={{ maxWidth: "20rem", maxHeight: "6rem" }} />
      </Container>
    </Navbar>
  );
};

export default Header;
