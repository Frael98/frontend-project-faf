import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

export const Login = () => {

    const [usuario, setUsuario] = useState('')
    
    return (

        <Row className="my-4 justify-content-center">
            <Col md='4'>
                <Form className="card card-body">
                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Usuario" ></Form.Control>
                        <Form.Label>Usuario</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Control placeholder="Contraseñ" type="password"></Form.Control>
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