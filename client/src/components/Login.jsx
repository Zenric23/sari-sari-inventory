import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <h1 className="text-center mt-5">SARI-SARI STORE INVENTORY SYSTEM</h1>
      <Col lg={4} className="mx-auto mt-5">
        <div className="border p-4 shadow-sm border-1">
            <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-1">
                LOGIN
            </Button>
            </Form>
        </div>
      </Col>
    </>
  );
};

export default Login;
