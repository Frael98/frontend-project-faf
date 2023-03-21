import { saveArbitro, listarArbitros, obtenerArbitro, upadteArbitro, eliminarArbitro } from '../../services/peticiones-arbitro/arbitro-re' // ^Peticiones

import { useEffect, useState } from "react"
import { Row, Col, Form, Button, Toast, ToastContainer, Modal } from 'react-bootstrap'
import { ColumnasArbitro } from "../../models/Columnas"

import { ArbitrosReporte } from "../../reportes/ArbitrosReporte";
import { ModalConfirmacion } from '../components/ModalConfirmacion';

/**
 * Contiene todo los aspectos del modulo de registro de arbitros
 * @returns <Modulo Registro>
 */
export const RegistroArbitro = () => {

    const [arbitros, setArbitros] = useState([]);
    const [arbitrosFiltrados, setArbitrosFiltrados] = useState([]);
    const [show, setShow] = useState(false)
    const [showPDF, setShowPDF] = useState(false);

    /**
     * 
     */
    const getArbitros = async () => {
        const datos = await (await listarArbitros()).data;
        setArbitrosFiltrados(datos)
        setArbitros(datos)
    }

    const imprimirPDF = () => {

    }

    const filtro = (e) => {
        const { value } = e.target
        if (value.trim() !== '') {
            setArbitrosFiltrados(
                arbitros.filter(ele => { return ele.usuario.toLowerCase().includes(value.toLowerCase()) })
            )
        } else {
            setArbitrosFiltrados(arbitros)
        }
    }

    return (
        <>
            <h3 className="mx-4 my-2">Registro Arbitros</h3>
            <Row className="justify-content-center my-2">
                <Col md="11" className="my-2 p-2 border g-2 rounded">
                    <Row className="">
                        <Col sm="4">
                            <Button className="" variant="success" onClick={() => setShow(true)}>Nuevo</Button>
                            <Button className="mx-2" onClick={() => { setShowPDF(!showPDF) }}>Imprimir</Button>
                        </Col>
                        <Col sm="8">
                            <Form.Group as={Row} className="justify-content-end text-center">
                                <Form.Label column sm="2">Buscar por:</Form.Label>
                                <Col sm="8">
                                    <Form.Control onKeyUp={(e) => filtro(e)} type="text" placeholder="Juanito ..." ></Form.Control>
                                </Col>
                                <Col sm="2">
                                    <Button>Buscar
                                        <span className="btn-label">
                                            <i className="bi bi-search"></i>
                                        </span>
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col md="10" className="my-2 border rounded">
                    <TablaArbitros getArbitros={getArbitros} arbitros={arbitrosFiltrados} />
                </Col>
                <ModalFormularioEdit show={show} onHide={() => setShow(false)} idArbitroEdit={null} />

                {showPDF && <ArbitrosReporte titulo={'Listado de Arbitros'} />}
            </Row>
        </>
    )
}

/**
 * Tabla de datos
 * @param {*} param0 
 * @returns 
 */
const TablaArbitros = ({ getArbitros, arbitros }) => {

    const [editar, setEditar] = useState(false)
    const [idArbitroEdit, setIdArbitroEdit] = useState(null);
    const [modalConfirmacion, setModalConfirmacion] = useState(false);


    /**
     * 
     * @param {*} id_arbitro 
     */
    const handleDelete = async () => {
        console.log()
        const res = await (await eliminarArbitro(idArbitroEdit)).data;
        console.log(res)
        setModalConfirmacion(false)
        getArbitros();
    }

    const mostrarModal = id_arbitro => {
        setModalConfirmacion(true);
        setIdArbitroEdit(id_arbitro)
    }

    /**
     * 
     * @param {*} id_arbitro 
     */
    const handleEdit = async (id_arbitro) => {
        setIdArbitroEdit(id_arbitro)
        setEditar(true)
    }

    useEffect(() => {
        getArbitros();
    }, [])

    return (
        <>
            <div className="table-responsive text-center">
                <table className="table table-sm table-striped table-hover">
                    <thead>
                        <tr>
                            <th>{ColumnasArbitro.NOMBRES}</th>
                            <th>{ColumnasArbitro.APELLIDOS}</th>
                            <th>{ColumnasArbitro.CORREO}</th>
                            <th>{ColumnasArbitro.USUARIO}</th>
                            <th>{ColumnasArbitro.CATEGORIA}</th>
                            <th>{ColumnasArbitro.DIRECCION}</th>
                            <th>{ColumnasArbitro.NACIONALIDAD}</th>
                            <th>{ColumnasArbitro.PARTIDOS}</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arbitros ?
                            arbitros.map((a) => (
                                <tr key={a.id_arbitro}>
                                    <td>{a.nombre}</td>
                                    <td>{a.apellido}</td>
                                    <td>{a.correo}</td>
                                    <td>{a.usuario}</td>
                                    <td>{a.categoria}</td>
                                    <td>{a.direccion}</td>
                                    <td>{a.nacionalidad}</td>
                                    <td>{a.partidos}</td>
                                    <td>
                                        <Button onClick={() => { mostrarModal(a.id_arbitro) }} variant="danger">Eliminar</Button>
                                        <Button onClick={() => handleEdit(a.id_arbitro)} variant="success">Editar</Button>
                                    </td>
                                </tr>
                            )) : <div> Esperando respuesta ...</div>}
                    </tbody>
                </table>
                {<ModalFormularioEdit titulo="Editar Arbitro" show={editar} onHide={() => setEditar(false)} idArbitroEdit={idArbitroEdit} getArbitros={getArbitros} />}
                {modalConfirmacion && <ModalConfirmacion show={modalConfirmacion} setModalConfirmacion={setModalConfirmacion} titulo={"Mensaje"} mensaje={"Desea eliminar este registro?"} Confirmacion={handleDelete} />}
            </div>
        </>
    );
}

/**
 * Modal Formulario
 * @param {} param0 
 * @returns 
 */
const ModalFormularioEdit = ({ idArbitroEdit, show, onHide, titulo, getArbitros }) => {

    const [validated, setValidated] = useState(false);
    const [alerta, setAlerta] = useState(false)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre === '' || apellido === '' || usuario == '' || correo == '' || contrasenia === '') {
            setAlerta(true)
            console.log("Campos no completos")
            return
        }

        if (idArbitroEdit !== null) {
            handleUpdate();
            return;
        }

        handleSave();

    }

    const handleUpdate = async () => {
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
            partidos
        }

        try {
            const res = await (await upadteArbitro(idArbitroEdit, arbitro)).data;
            console.log("Actualizando datos")
        } catch (error) {

        }
        onHide(true);
        getArbitros();
    }

    const handleSave = async () => {

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
            partidos
        }

        try {
            const res = await saveArbitro(arbitro);
            console.log(`enviando datos ${arbitro}`)
        } catch (error) {
            console.log(error)
        }
        onHide(true);
    }

    const handleEdit = async () => {

        /* console.log(idArbitroEdit) */
        if (idArbitroEdit === null || idArbitroEdit === 0) {
            console.log(`Id arbitro es cero`);
            return;
        }
        const arbitro = await (await obtenerArbitro(idArbitroEdit)).data
        console.log(arbitro)
        setNombre(arbitro.nombre)
        setApellido(arbitro.apellido)
        setUsuario(arbitro.usuario)
        setCorreo(arbitro.correo)
        setContrasenia(arbitro.contrasenia)
        setDireccion(arbitro.direccion ?? '')
        setPartidos(arbitro.partidos ?? '')
        setCategoria(arbitro.categoria ?? '')
        setFechaNacimiento(arbitro.fechaNacimiento ?? '')
        setNacionalidad(arbitro.nacionalidad ?? '')

    }


    useEffect(() => {
        handleEdit();
    }, [idArbitroEdit])

    return (
        <>
            <Modal size="lg" show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo ? titulo
                        : "Ingresar Arbitro"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} className="row" onSubmit={handleSubmit} >
                        <Col md='12'>
                            <Form.Group as={Row} className="mb-2" controlId="validationNombre">
                                <Form.Label className="" column sm='3' >Nombres <span style={{ color: "red" }}>*</span> </Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={nombre} onChange={(e) => { setNombre(e.target.value) }} type="input" maxLength={25} autoFocus required></Form.Control>
                                </Col>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Porfavor llene el nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Apellidos <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={apellido} onChange={(e) => { setApellido(e.target.value) }} type="input" maxLength={25}></Form.Control>
                                </Col>                        </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Usuario <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} type="input" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Correo <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={correo} onChange={(e) => { setCorreo(e.target.value) }} type="email" maxLength={25}></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Contraseña <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={contrasenia} onChange={(e) => { setContrasenia(e.target.value) }} type="password" maxLength={20} autoComplete="current-password"></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Direccion</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={direccion} onChange={(e) => { setDireccion(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Fecha Naciminento</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={fechaNacimiento} onChange={(e) => { setFechaNacimiento(e.target.value) }} type="date" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Categoria</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={categoria} onChange={(e) => { setCategoria(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Nacionalidad</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" value={nacionalidad} onChange={(e) => { setNacionalidad(e.target.value) }} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Modal.Footer>
                            {/* <Button variant="danger" onClick={handleDelete}>Eliminar</Button> */}
                            <Button variant="success" type="submit">Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

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