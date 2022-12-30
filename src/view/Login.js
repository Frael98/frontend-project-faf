import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { autenticarUsuario } from "../services/Peticiones";
import { redirect } from "react-router-dom";

export const Login = () => {

    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('');

    const handleUsuario = (e) => {
        setUsuario(e.target.value)
    }

    const handleContrasenia = (e) => {
        setContrasenia(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ usuario, contrasenia })

        const res = await autenticarUsuario({ usuario, contrasenia }); // Param..

        if (res) {
            /// Redirect to menu usuario
        }
        else {
            // Show mensaje
        }
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

                    <Form.Group as={Row} className="justify-content-center my-4 ">

                        <Col className="align-self-center">
                            <a href="/"> Registrarse </a></Col>
                    </Form.Group>
                </Form>
            </Col>
        </Row >
    )
}