import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom'
import apiReq from "../apiReq";
import Nav from "react-bootstrap/Nav";
import {Navbar, Container, Spinner  } from "react-bootstrap";


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
        if(input?.pass !== input?.rePass) {
            window.alert('Password does not matched.')
            return
        }
        try {
            const {confirmPass, ...others} = input
            await apiReq.post('/auth/register', others)
            window.location.replace('/login')
        } catch (error) {
            setIsLoading(false)
            window.alert(error.response.data)
            console.log(error)
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
                <Link to="/login" className="text-light">Sign In</Link>
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Col lg={4} className="mx-auto mt-5">
        <div className="border p-4 shadow-sm border-1">
            <h4 className="mb-4">REGISTER</h4>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleInputChange} value={input?.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="pass" onChange={handleInputChange} value={input?.pass} minLength="8" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="rePass" onChange={handleInputChange} value={input?.rePass} minLength="8" />
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
