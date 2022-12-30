import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

export const Login = () => {

    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('');

    const handleUsuario = (e) => {
        setUsuario(e.target.value)
    }

    const handleContrasenia = (e) => {
        setContrasenia(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({usuario, contrasenia})
    }

    return (

        <Row className="my-4 justify-content-center">
            <Col md='4'>
                <Form className="card card-body" onSubmit={handleSubmit} >
                    <Form.Floating className="mb-3">
                        <Form.Control onChange={handleUsuario} placeholder="Usuario" ></Form.Control>
                        <Form.Label>Usuario</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control onChange={handleContrasenia} placeholder="Contraseñ" type="password"></Form.Control>
                        <Form.Label>Contraseña</Form.Label>
                    </Form.Floating>

                    <Form.Group>
                        <Row>
                            <Button variant="success" as="input" type="submit" value="Iniciar Sesion" />
                        </Row>
                    </Form.Group>
                </Form>
            </Col>
        </Row >
    )
}