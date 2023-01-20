import { useState } from "react"
import { Row, Col, Form, Button } from 'react-bootstrap'

export const RegistroArbitro = () => {

    const [validated, setValidated] = useState(false);
    const [cedula, setCedula] = useState('')

    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [usuario, setUsuario] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [anioDebut, setAnioDebut] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')
    const [categoria, setCategoria] = useState('')
    const [comite, setComite] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')
    const [funcion, setFuncion] = useState('')
    const [partidos, setPartidos] = useState('')
    const [Telefono, setTelefono] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`enviando datos`)
    }
    return (
        <>
            <h3 className="mx-4 my-2">Registro Arbitros</h3>
            <Row className="justify-content-center my-2 mx-2 contenedor">
                <Col md="8" className="my-2">
                    <Form noValidate validated={validated} className="row" onSubmit={handleSubmit} >
                        <Col md='6'>
                            <Form.Group as={Row} className="mb-2" controlId="validationNombre">
                                <Form.Label className="" column sm='3' >Nombres</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setNombre(e.target.value) }} type="input" maxLength={25} autoFocus required></Form.Control>
                                </Col>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Porfavor llene el nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Apellidos</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setApellidos(e.target.value) }} type="input" maxLength={25}></Form.Control>
                                </Col>                        </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Usuario</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setCedula(e.target.value) }} type="input" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Correo</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setCorreo(e.target.value) }} type="email" maxLength={25}></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Contraseña</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setContrasenia(e.target.value) }} type="password" maxLength={20} autoComplete="current-password"></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Telefono</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setTelefono(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Direccion</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setDireccion(e.target.value) }} type="text" maxLength={20} ></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Funcion</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setFuncion(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3' >Usuario</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setUsuario(e.target.value) }} type="input" maxLength={25} autoFocus></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Año Debut</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setAnioDebut(e.target.value) }} type="input" maxLength={25}></Form.Control>
                                </Col>                        </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Fecha Naciminento</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setFechaNacimiento(e.target.value) }} type="input" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Altura</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setAltura(e.target.value) }} type="email" maxLength={25}></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Peso</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setPeso(e.target.value) }} type="password" maxLength={20} autoComplete="current-password"></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Categoria</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setCategoria(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Comite</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setComite(e.target.value) }} type="text" maxLength={20} ></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Nacionalidad</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setNacionalidad(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Button type="submit">Guardar</Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}