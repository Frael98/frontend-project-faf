import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { autenticarArbitro, autenticarUsuario } from "../services/Peticiones";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContexto } from "./UsuarioContexto";

/**
 * 
 * @returns Componente Login
 */
export const Login = () => {

    const [showAlert, setShowAlert] = useState(false)
    const { logeado, setLogeado, setUser } = useContext(UsuarioContexto);

    const navigate = useNavigate()
    //Inputs
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
        e.preventDefault();
        const form = e.currentTarget;
        console.log({ usuario, contrasenia })

        if (usuario === '') return


        try {
            var usuarioSesion = await autenticarUsuario({ usuario, contrasenia }); // Param..
            if (usuarioSesion.data === '') {
                usuarioSesion = await autenticarArbitro({ usuario, contrasenia })
            }
            console.log(usuarioSesion)
            if (usuarioSesion.data === '') {
                setShowAlert(true)
                console.log(showAlert)
                return
            }

            /** Seteo de los datos del user */
            console.log(usuarioSesion.data)
            setUser(usuarioSesion.data)
            setLogeado(!logeado) // logeado
            navigate('/home') // redirect to home
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">{/* Ajusta en horizantal */}
            <Row className="my-4 justify-content-center p-4">
                <Col md='6' sm='6' xl='4' >
                    {showAlert ? <Alert key="danger" variant="danger">
                        Usuario o contraseña incorrecto, asegurese de tener una cuenta!.
                    </Alert> : ''}
                    <Form className="card card-body" onSubmit={handleSubmit} >
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
        </div>
    )
}