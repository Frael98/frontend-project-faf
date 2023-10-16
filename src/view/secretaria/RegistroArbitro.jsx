import { saveArbitro, listarArbitros, obtenerArbitro, upadteArbitro, eliminarArbitro, downloadPDF } from '../../services/peticiones/arbitro-re' // ^Peticiones

import { useEffect, useState } from "react"
import { Row, Col, Form, Button, Toast, ToastContainer, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ColumnasArbitro } from "../../Constants/Columnas"
import { ModalConfirmacion } from '../components/ModalConfirmacion';
import { Search, PlusCircleFill, PrinterFill, Trash3Fill, SaveFill, PencilSquare } from "react-bootstrap-icons"
import MyPagination from '../components/MyPagination';


const tooltip = [
    <Tooltip>PDF con react-pdf</Tooltip>,
    <Tooltip>PDF con PDFBox desde backend</Tooltip>
]


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
     * Cargar todos los arbitros
     */
    const getArbitros = async () => {
        const datos = await (await listarArbitros()).data;
        setArbitrosFiltrados(datos)
        setArbitros(datos)
        //await new Promise((resolve => setTimeout(resolve, 3000))) // simular retraso
    }

    const imprimirPDF = () => {
        window.open(`/pdf-arbitros`, '_blank', 'width=1024,height=650,left=0,top=0,toolbar=no,titlebar=no,status=no,menubar=no,location=no')
    }

    const downloadPDFBox = async () => {
        //const pdf = (await downloadPDF()).data;
        //console.log(pdf)
        try {
            const response = await downloadPDF();
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'arbitros.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error al descargar el PDF', error);
        }
    }

    /**
     * Filtro desde cliente
     * @param {event} e 
     */
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
        <div className='container p-2'>
            <h3 className="mx-4 my-2">Registro Arbitros</h3>
            <Row className="justify-content-center my-2">
                <Col md="11" sm='11' className="my-2 p-2 border g-2 rounded">
                    <Row className="d-flex align-items-center">

                        <Col sm="12" md='4' className='d-inline alig-items-center'>
                            <Button className="" variant="success" onClick={() => setShow(true)}>Nuevo <PlusCircleFill /> </Button>
                            <OverlayTrigger placement='top' sm="auto" overlay={tooltip[0]}>
                                <Button className="mx-2" md="auto" onClick={() => { imprimirPDF() }}
                                >Imprimir 1 <PrinterFill /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger sm="auto" placement='top' overlay={tooltip[1]}>
                                <Button className="mx-2" md="auto" onClick={downloadPDFBox}
                                >Imprimir 2 <PrinterFill /></Button>
                            </OverlayTrigger>
                        </Col>

                        <Col sm="12" md='8'>
                            <Form.Group as={Row} className="justify-content-end text-center">
                                <Form.Label column sm="6" md='2'>Buscar por:</Form.Label>
                                <Col sm="8">
                                    <Form.Control onKeyUp={(e) => filtro(e)} type="text" placeholder="Juanito ..." ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col md="12" sm='12' className="my-2 border rounded">
                    <TablaArbitros getArbitros={getArbitros} arbitros={arbitrosFiltrados} />
                </Col>
                {show && <ModalFormularioEdit show={show} onHide={() => setShow(false)} idArbitroEdit={null} getArbitros={getArbitros} />}


                {/* {showPDF && <ArbitrosReporte titulo={'Listado de Arbitros'} />} */}
            </Row>
        </div>
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

    const [paginaActual, setPaginaActual] = useState(1);
    const totalRegistroPorPagina = 6
    const totalPaginas = (Math.ceil(arbitros.length > 0 && arbitros.length / totalRegistroPorPagina))
    // Partimos los equipos
    const primerRegistro = (paginaActual - 1) * totalRegistroPorPagina
    const ultimoRegistro = primerRegistro + totalRegistroPorPagina
    const registrosPorPagina = arbitros.slice(primerRegistro, ultimoRegistro)

    const irAPagina = (index) => {
        setPaginaActual(index)
    }
    /**
     * 
     * @param {*} id_arbitro 
     */
    const handleDelete = async () => {
        const res = await (await eliminarArbitro(idArbitroEdit)).data;
        setModalConfirmacion(false)
        getArbitros();
    }

    /**
     * Muestra modalConfirmacion
     * @param {int} id_arbitro 
     */
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
            {
                arbitros.length === 0 ? <div class="d-flex justify-content-center">
                    <div class="spinner-border m-5 text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                    :
                    <div className="table-responsive text-center">
                        <table className="table table-sm table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
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
                                {
                                    arbitros.map((a, i) => (
                                        <tr key={a.id_arbitro}>
                                            <td>{i + 1}</td>
                                            <td>{a.nombre}</td>
                                            <td>{a.apellido}</td>
                                            <td>{a.correo}</td>
                                            <td>{a.usuario}</td>
                                            <td>{a.categoria}</td>
                                            <td>{a.direccion}</td>
                                            <td>{a.nacionalidad}</td>
                                            <td>{a.partidos}</td>
                                            <td className='d-flex'>{/* Correccion de posicion de botones */}
                                                <Button className='mx-1' onClick={() => handleEdit(a.id_arbitro)} variant="success"><PencilSquare /></Button>
                                                <Button onClick={() => { mostrarModal(a.id_arbitro) }} variant="danger"><Trash3Fill /></Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <MyPagination irAPagina={irAPagina} paginaActual={paginaActual} totalPaginas={totalPaginas}></MyPagination>
                        {editar && <ModalFormularioEdit titulo="Editar Arbitro" show={editar} onHide={() => setEditar(false)} idArbitroEdit={idArbitroEdit} getArbitros={getArbitros} />}
                        {modalConfirmacion && <ModalConfirmacion show={modalConfirmacion} setModalConfirmacion={setModalConfirmacion} titulo={"Mensaje"} mensaje={"Desea eliminar este registro?"} Confirmacion={handleDelete} />}
                    </div>
            }

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

    /* const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [usuario, setUsuario] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [categoria, setCategoria] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')
    const [partidos, setPartidos] = useState('') */

    const [arbitro, setArbitro] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        correo: '',
        contrasenia: '',
        fechaNacimiento: '',
        categoria: '',
        direccion: '',
        nacionalidad: '',
        partidos: '',
    })

    const handleChange = (e) => {
        setArbitro( prev => ({...prev, [e.target.name]: e.target.value}))
    }

    /**
     * Submit
     * @param {} e 
     * @returns 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre === '' || apellido === '' || usuario == '' || correo == '' || contrasenia === '') {
            setAlerta(true)
            return
        }

        if (idArbitroEdit !== null) {
            handleUpdate();
            return;
        }
        handleSave();

    }

    /**
     * Actulizar
     */
    const handleUpdate = async () => {
        /* var arbitro = {
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
 */
        try {
            const res = await (await upadteArbitro(idArbitroEdit, arbitro)).data;
            console.log("Actualizando datos")
        } catch (error) {

        }
        onHide(true);
        getArbitros();
        clearTexts();
    }

    /**
     * Guadar
     */
    const handleSave = async () => {

        /* var arbitro = {
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
        } */

        try {
            const res = await saveArbitro(arbitro);
            console.log(`enviando datos ${arbitro}`)
        } catch (error) {
            console.log(error)
        }
        onHide(true);
        getArbitros();
        clearTexts();
    }

    /**
     * 
     * @returns 
     */
    const handleEdit = async () => {
        if (idArbitroEdit === null || idArbitroEdit === 0) {
            console.log(`Id arbitro es cero`);
            return;
        }
        const arbitroEdit = await (await obtenerArbitro(idArbitroEdit)).data
        console.log(arbitro)

        setArbitro({
            nombre: arbitroEdit.nombre,
            apellido: arbitroEdit.apellido,
            usuario: arbitroEdit.usuario,
            correo: arbitroEdit.correo,
            contrasenia: arbitroEdit.contrasenia,
            direccion: arbitroEdit.direccion ?? '',
            partidos: arbitroEdit.partidos ?? '',
            categoria: arbitroEdit.categoria ?? '',
            fechaNacimiento: arbitroEdit.fechaNacimiento ?? '',
            nacionalidad: arbitroEdit.nacionalidad ?? '',
        })
        /* setNombre(arbitro.nombre)
        setApellido(arbitro.apellido)
        setUsuario(arbitro.usuario)
        setCorreo(arbitro.correo)
        setContrasenia(arbitro.contrasenia)
        setDireccion(arbitro.direccion ?? '')
        setPartidos(arbitro.partidos ?? '')
        setCategoria(arbitro.categoria ?? '')
        setFechaNacimiento(arbitro.fechaNacimiento ?? '')
        setNacionalidad(arbitro.nacionalidad ?? '') */

    }

    /**
     * Limpia input
     */
    const clearTexts = () => {
        setArbitro({
            nombre: '',
            apellido: '',
            usuario: '',
            correo: '',
            contrasenia: '',
            fechaNacimiento: '',
            categoria: '',
            direccion: '',
            nacionalidad: '',
            partidos: '',
        })
        /* setNombre('')
        setApellido('')
        setUsuario('')
        setCorreo('')
        setContrasenia('')
        setDireccion('')
        setPartidos('')
        setCategoria('')
        setFechaNacimiento('')
        setNacionalidad('') */
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
                                    <Form.Control size="sm" name='nombre' value={arbitro?.nombre} onChange={handleChange} type="input" maxLength={25} autoFocus required></Form.Control>
                                </Col>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Porfavor llene el nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Apellidos <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='apellido' value={arbitro?.apellido} onChange={handleChange} type="input" maxLength={25}></Form.Control>
                                </Col>                        </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Usuario <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='usuario' value={arbitro?.usuario} onChange={handleChange} type="input" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Correo <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='correo' value={arbitro?.correo} onChange={handleChange} type="email" maxLength={25}></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Contraseña <span style={{ color: "red" }}>*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='contrasenia' value={arbitro?.contrasenia} onChange={handleChange} type="password" maxLength={20} autoComplete="current-password"></Form.Control>

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Direccion</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='direccion' value={arbitro?.direccion} onChange={handleChange} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Fecha Naciminento</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='fechaNacimiento' value={arbitro?.fechaNacimiento} onChange={handleChange} type="date" maxLength={15}></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Categoria</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='categoria' value={arbitro?.categoria} onChange={handleChange} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2">
                                <Form.Label className="" column sm='3'>Nacionalidad</Form.Label>
                                <Col sm='9'>
                                    <Form.Control size="sm" name='nacionalidad' value={arbitro?.nacionalidad} onChange={handleChange} type="text" maxLength={20} ></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Modal.Footer>
                            {/* <Button variant="danger" onClick={handleDelete}>Eliminar</Button> */}
                            <Button variant="success" type="submit">Guardar <SaveFill /> </Button>
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