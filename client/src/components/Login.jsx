import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import apiReq from "../apiReq";
import Nav from "react-bootstrap/Nav";
import {Navbar, Container, Spinner, Alert} from "react-bootstrap";

const Login = () => {
  const [input, setInput] = useState({})
  const [isLoading, setIsLoading] = useState(false)


  const handleInputChange = (e) => {
      setInput(prev=> {
          return {
              ...prev,
              [e.target.name]: e.target.value
          }
      })
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
          const res = await apiReq.post('/auth/login', input)
          localStorage.setItem("userDetails", JSON.stringify(res.data.userDetails))
          window.location.replace('/')
      } catch (error) {
        setIsLoading(false)
        window.alert(error.response.data)
      }
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
                style={{ textDecoration: "underline" }}
              >
                <Link to="/register" className="text-light">Sign Up</Link>
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Col lg={4} className="mx-auto mt-5">
        <div className="border p-4 shadow-sm border-1">
            <h4 className="mb-4">LOGIN</h4>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} value={input?.email} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} value={input?.pass} name="pass" minLength="8" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-1" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : 'SUBMIT'}
            </Button>
            </Form>
        </div>
      </Col>
    </>
  );
};

export default Login;
