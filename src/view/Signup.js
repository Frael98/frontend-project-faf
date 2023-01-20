import { useState } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { signupUsuario } from "../services/Peticiones"

/**
 * 
 * @returns Componente Registro
 */
export const Signup = () => {

    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [usuario, setUsuario] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        var nuevoUsuario = {
            nombres,
            apellidos,
            usuario,
            correo,
            contrasenia,
        }
        console.log(nuevoUsuario)

        try {
            const newUser = await signupUsuario(nuevoUsuario)

            console.log(newUser)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <Row className="justify-content-center my-2 mx-2 background contenedor">
            <Col md="4 my-4">
                <Form className="card card-body" onSubmit={handleSubmit}>
                    <div className="card-title">
                        <h4 className="text-center">Registro Usuario</h4>
                    </div>
                    <Form.Group className="mb-2">
                        <Form.Control onChange={(e) => {setNombres(e.target.value)}} type="input" placeholder="Juan" maxLength={25} autoFocus></Form.Control>
                        {/* <Form.Label>Nombres</Form.Label> */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control onChange={(e) => {setApellidos(e.target.value)}} type="input" placeholder="Rodriguez" maxLength={25}></Form.Control>
                        {/* <Form.Label>Apellidos</Form.Label> */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control onChange={(e) => {setUsuario(e.target.value)}} type="input" placeholder="juan.ro" maxLength={15}></Form.Control>
                        {/* <Form.Label>Usuario</Form.Label> */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control onChange={(e) => {setCorreo(e.target.value)}} type="email" placeholder="example@email.com" maxLength={25}></Form.Control>
                        {/* <Form.Label>Correo</Form.Label> */}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control onChange={(e) => {setContrasenia(e.target.value)}} type="password" placeholder="Contraseña" maxLength={20} autoComplete="current-password"></Form.Control>
                        {/* <Form.Label>Contraseña</Form.Label> */}
                    </Form.Group>
                    
                    <Button type="submit">Registrarse</Button>
                    <Link className="my-2 text-center" to="/">Ya tengo una cuenta!</Link> 
                </Form>
            </Col>
        </Row>
    </>);
}