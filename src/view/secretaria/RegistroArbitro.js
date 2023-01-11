import { useState } from "react"
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

export const RegistroArbitro = () => {

    const [cedula, setCedula] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [federacion, setFederacion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const handleSubmit = () => {

    }
    return (
        <>
                <h3 className="mx-4 my-2">Registro Arbitros</h3>
            <Row className="justify-content-center my-2 mx-2 contenedor">
                <Col md="6 my-2">
                    <Form className="card card-body" onSubmit={handleSubmit}>
                        <div className="card-title">
                        </div>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2' >Nombres</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setNombre(e.target.value) }} type="input" maxLength={25} autoFocus></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Apellidos</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setApellidos(e.target.value) }} type="input" maxLength={25}></Form.Control>
                            </Col>                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Usuario</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setCedula(e.target.value) }} type="input" maxLength={15}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Correo</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setCorreo(e.target.value) }} type="email" maxLength={25}></Form.Control>

                            </Col>                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Contraseña</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setContrasenia(e.target.value) }} type="password" maxLength={20} autoComplete="current-password"></Form.Control>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Telefono</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setTelefono(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Direccion</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setDireccion(e.target.value) }} type="text" maxLength={20} ></Form.Control>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-2">
                            <Form.Label className="text-center" column sm='2'>Federacion</Form.Label>
                            <Col sm='10'>
                                <Form.Control size="sm" onChange={(e) => { setFederacion(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                            </Col>
                        </Form.Group>

                        <Button type="submit">Guardar</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}