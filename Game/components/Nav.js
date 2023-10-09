import React from "react";
import Link from "next/link";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link href="/" passHref className="link">
          <Navbar.Brand>Game Site</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/games" passHref legacyBehavior>
              <Nav.Link>Game</Nav.Link>
            </Link>
            <Link href="/FAQ" passHref legacyBehavior>
              <Nav.Link>FAQs</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
