import { useEffect, useState } from "react"
import { Row, Col, Form, Button, Toast, ToastContainer, Modal } from 'react-bootstrap'
import { saveArbitro, listarArbitros } from '../../services/peticiones-arbitro/arbitro-re'

export const RegistroArbitro = () => {

    const [show, setShow] = useState(false)

    return (
        <>
            <h3 className="mx-4 my-2">Registro Arbitros</h3>
            <Row className="justify-content-center my-2">
                <Col md="10" className="my-2 p-2 border g-2">
                    <Button className="" variant="success" onClick={() => setShow(true)}>Nuevo</Button>
                    <Button className="mx-2" onClick={() => { }}>Imprimir</Button>
                </Col>
                <ModalFormulario show={show} onHide={() => setShow(false)} />
                <Col md="10" className="my-2 border">
                    <TablaArbitros />
                </Col>
            </Row>
        </>
    )
}

const TablaArbitros = () => {

    const [arbitros, setArbitros] = useState([]);

    async function getArbitros() {

        const datos = await (await listarArbitros()).data;
        setArbitros(datos)
        /* console.log(datos) */
        console.log(arbitros)
    }

    useEffect(() => {
        getArbitros();
    }, [])

    return (
        <>
            <div className="table-responsive">
                <table className="table table-sm table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Usuario</th>
                            <th>Categoria</th>
                            <th>Direccion</th>
                            <th>Nacionalidad</th>
                            <th>Partidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arbitros.map((a) => (
                            <tr key={a.id_arbitro}>
                                <td>{a.nombre}</td>
                                <td>{a.apellidos}</td>
                                <td>{a.correo}</td>
                                <td>{a.usuario}</td>
                                <td>{a.categoria}</td>
                                <td>{a.direccion}</td>
                                <td>{a.nacionalidad}</td>
                                <td>{a.partidos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const ModalFormulario = (props) => {

    const [validated, setValidated] = useState(false);
    const [alerta, setAlerta] = useState(false)

    const [cedula, setCedula] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [usuario, setUsuario] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [categoria, setCategoria] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')
    const [partidos, setPartidos] = useState('')
    const [Telefono, setTelefono] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === '' || apellido === '' || usuario == '' || correo == '' || contrasenia === '') {
            setAlerta(true)
            return
        }

        var arbitro = {
            nombre,
            apellido,
            usuario,
            correo,
            contrasenia,

            fechaNacimiento,
            categoria,

            direccion,
            nacionalidad,

            partidos,
            Telefono
        }

        try {
            const res = await saveArbitro(arbitro);
            console.log(`enviando datos ${arbitro}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Ingresar Arbitro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} className="row" onSubmit={handleSubmit} >
                        <Col md='12'>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3' >Cedula</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setCedula(e.target.value) }} type="input" maxLength={25} autoFocus></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2" controlId="validationNombre">
                                <Form.Label className="" column sm='3' >Nombres <span style={{ color: "red" }}>*</span> </Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setNombre(e.target.value) }} type="input" maxLength={25} autoFocus required></Form.Control>
                                </Col>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Porfavor llene el nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Apellidos <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setApellido(e.target.value) }} type="input" maxLength={25}></Form.Control>
                                </Col>                        </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Usuario <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setUsuario(e.target.value) }} type="input" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Correo <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setCorreo(e.target.value) }} type="email" maxLength={25}></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Contraseña <span style={{ color: "red" }}>*</span></Form.Label>
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
                                <Form.Label className="" column sm='3'>Fecha Naciminento</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setFechaNacimiento(e.target.value) }} type="date" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Categoria</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setCategoria(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Nacionalidad</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" onChange={(e) => { setNacionalidad(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.handleDelete}>Eliminar</Button>
                    <Button variant="success" type="submit">Guardar</Button>
                </Modal.Footer>
                {alerta ?
                    <ToastContainer position="middle-center" >
                        <Toast bg="dark" onClose={() => setAlerta(false)} show={alerta} animation={true} delay={2000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Info</strong>
                            </Toast.Header>
                            <Toast.Body className="text-white">Por favor llene los campos obligatorios <span className="text-danger">*</span>.</Toast.Body>
                        </Toast>
                    </ToastContainer>
                    : ''}
            </Modal>
        </>
    );
}