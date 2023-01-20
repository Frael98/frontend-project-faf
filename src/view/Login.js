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

    const [validated, setValidated] = useState(false);
    const { logeado, setLogeado, setUser } = useContext(UsuarioContexto);

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('');

    const handleUsuario = (e) => {
        setUsuario(e.target.value)
    }

    const handleContrasenia = (e) => {
        setContrasenia(e.target.value)
    }

    /**
     * 
     * @param {event} e 
     * @returns void
     * Envia datos al REST y redirecciona al usuario -> Home
     */
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        console.log({ usuario, contrasenia })

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true)

        if (usuario === '') return

        try {
            //const res = await autenticarUsuario({ usuario, contrasenia }); // Param..
            //if (!res) return

            /* console.log(res) */
            setUser(usuario)
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
                    <Form noValidate validated={validated} className="card card-body" onSubmit={handleSubmit} >
                        <div className="card-title">
                            <h4 className="text-center">Inicio Sesion</h4>
                        </div>
                        <Form.Floating className="mb-3" >
                            <Form.Control onChange={handleUsuario} placeholder="Usuario" autoFocus autoComplete="username" required></Form.Control>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control.Feedback type="invalid">Por favor ingrese su usuario</Form.Control.Feedback>
                        </Form.Floating>
                        
                        <Form.Floating className="mb-3">
                            <Form.Control onChange={handleContrasenia} placeholder="Contraseña" type="password" autoComplete="current-password" required></Form.Control>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control.Feedback type="invalid">Por favor ingrese su contraseña</Form.Control.Feedback>
                        </Form.Floating>

                        <Button variant="success" as="input" type="submit" value="Iniciar Sesion" />

                        <Form.Group as={Row} className="justify-content-center my-2">
                            <Link to='/sign' className="mb-1 text-center">Registrarse</Link>
                            <Link to='/recuperar' className="mb-1 text-center">Olvide mi Contraseña</Link>
                        </Form.Group>

                    </Form>
                </Col>
            </Row >
        </>
    )
}