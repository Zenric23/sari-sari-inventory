import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, NavLink } from "react-router-dom";

const NavigationBar = () => {

  const handleLogout = () => {
    localStorage.removeItem('userDetails')
    window.location.replace('/login')
  }

  return (
    <>
      <Navbar bg="secondary" expand="lg">
        <Container>
          <Navbar.Brand className="text-white">
            SARI-SARI STORE INVENTORY SYSTEM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <span
                className="text-white"
                style={{ textDecoration: "underline", cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Nav className="justify-content-center py-2 border-bottom">
        <Nav.Item>
          <Nav.Link>
            <NavLink
              to="/"
              className="text-primary"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'underline' : 'none'
                }
              }}
            >
              Home
            </NavLink>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <NavLink
              to="/product-master"
              className="text-primary"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'underline' : 'none'
                }
              }}
            >
              Product Master
            </NavLink>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <NavLink
              to="/transaction"
              className="text-primary"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? 'underline' : 'none'
                }
              }}
            >
              Transaction
            </NavLink>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="mt-5">
        <Outlet />
      </Container>
    </>
  );
};

export default NavigationBar;
