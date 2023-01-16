import { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"

export const RegistroSecretario = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [usuario, setUsuario] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [direccion, setDireccion] = useState('')

    return (<>
        <Row className="m-4 container">
            <Col sm='6' md='6'>
                <Form className="card card-body">
                    <Form.Group as={Row}>
                        <Form.Label column sm='3'>Nombres</Form.Label>
                        <Col sm='8'>
                            <Form.Control size='sm' onChange={(e) => { setNombre(e.target.value) }} required maxLength='20' autoFocus></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm='3'>Apellidos</Form.Label>
                        <Col sm='8'>
                            <Form.Control size='sm' onChange={(e) => { setApellido(e.target.value) }} required maxLength='20'></Form.Control>

                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm='3' >Direccion</Form.Label>
                        <Col sm='8'>
                            <Form.Control size='sm' onChange={(e) => { setDireccion(e.target.value) }} required maxLength='20'></Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm='3'>Usuario</Form.Label>
                        <Col sm='8'>
                            <Form.Control size='sm' onChange={(e) => { setUsuario(e.target.value) }} type="input" maxLength={15}></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm='3'>Correo</Form.Label>
                        <Col sm='8'>
                            <Form.Control size='sm' onChange={(e) => { setCorreo(e.target.value) }} type="email" maxLength={25}></Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm='3' >Contraseña</Form.Label>
                        <Col sm='8'>
                            <Form.Control size='sm' onChange={(e) => { setContrasenia(e.target.value) }} type="password" maxLength={20} autoComplete="current-password"></Form.Control>
                        </Col>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </>)
}