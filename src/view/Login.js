import { Button, Form, Row, Col, Image } from "react-bootstrap";
import React, { useState } from "react";
import { autenticarUsuario } from "../services/Peticiones";
import { Link, redirect } from "react-router-dom";


/**
 * 
 * @returns Componente Login
 */
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
        <>
            <Row className="my-4 justify-content-center">
                <Col md='4'>
                    <Form className="card card-body" onSubmit={handleSubmit} >
                        <div className="card-title">
                            <h4 className="text-center">Inicio Sesion</h4>
                        </div>
                        <Form.Floating className="mb-3">
                            <Form.Control onChange={handleUsuario} placeholder="Usuario" autoFocus></Form.Control>
                            <Form.Label>Usuario</Form.Label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control onChange={handleContrasenia} placeholder="Contraseñ" type="password"></Form.Control>
                            <Form.Label>Contraseña</Form.Label>
                        </Form.Floating>

                        <Button variant="success" as="input" type="submit" value="Iniciar Sesion" />

                        <Form.Group as={Row} className="justify-content-center my-2">
                            <Link to='/sign' className="mb-1 text-center">Registrarse</Link>
                            <Link to='' className="mb-1 text-center">Olvide mi Contraseña</Link>
                        </Form.Group>

                    </Form>
                </Col>
            </Row >
        </>
    )
}