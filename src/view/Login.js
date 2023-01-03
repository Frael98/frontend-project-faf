import { Button, Form, Row, Col } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { autenticarUsuario } from "../services/Peticiones";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContexto } from "./UsuarioContexto";

/**
 * 
 * @returns Componente Login
 */
export const Login = () => {

    const { logeado, setLogeado} = useContext(UsuarioContexto);

    const navigate = useNavigate()

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

        try {
            /* const res = await autenticarUsuario({ usuario, contrasenia }); // Param..
            if (!res) return */
            setLogeado(!logeado)
            navigate('/home')
        } catch (error) {
            console.log(error)
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