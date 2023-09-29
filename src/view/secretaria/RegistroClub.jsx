import React from 'react'
import { useEffect, useRef, useState } from "react"
import { Form, Row, Col, Modal, Button, Pagination } from "react-bootstrap"
import { ColumnasEquipo } from "../../models/Columnas"
import { eliminarEquipo, listarEquipos, listarEquipos_, obtenerEquipo, saveEquipo, upadteEquipo } from "../../services/peticiones/equipo-re"
import { Search, PlusCircleFill, PrinterFill, Trash3Fill, SaveFill } from "react-bootstrap-icons"
import { ModalConfirmacion } from "../components/ModalConfirmacion"
import Pdf from 'react-to-pdf' // uso de react-to-pdf

export const RegistroClub = () => {

    const [equipos, setEquipos] = useState([]);
    const [show, setShow] = useState(false)
    //crea la referencia
    const ref = React.createRef()

    const getEquipos = async () => {
        const data = await (await listarEquipos()).data;
        setEquipos(data);
    }

    const filtro = async (e) => {
        const { value } = e.target;
        if (value.trim() === '') {
            getEquipos()
        }
        else {
            /* console.log(value) */
            const data = await (await listarEquipos_(value)).data;
            /* console.log(data) */
            setEquipos(data)
        }

    }

    useEffect(() => {
        getEquipos();
    }, [])

    return (

        <>
            <h3 className="mx-4 my-2">Registros de Equipo</h3>
            <Row className="justify-content-center">
                <Col md="11" className="my-2 p-2 border g-2 rounded">
                    <Row className="">
                        <Col sm="4">
                            <Button variant="success" onClick={() => setShow(true)}> Nuevo <PlusCircleFill /> </Button>

                            <Pdf targetRef={ref} filename="equipos.pdf">
                                {({ toPdf }) => <Button className="mx-2" onClick={toPdf}> Imprimir <PrinterFill /> </Button>}
                            </Pdf>

                        </Col>
                        <Col sm="8">
                            <Form.Group as={Row} className="justify-content-end text-center">
                                <Form.Label column sm="2">Buscar:</Form.Label>
                                <Col sm="8">
                                    <Form.Control onKeyUp={(e) => filtro(e)} type="text" placeholder="Algo ..." ></Form.Control>
                                </Col>
                                <Col sm="2">
                                    <Button> <Search /> </Button>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Col sm='10' className="border rounded my-2">
                    <TablaEquipos getEquipos={getEquipos} equipos={equipos} refer={ref}></TablaEquipos>
                </Col>

                <ModalFormularioEquipo show={show} onHide={() => setShow(false)} getEquipos={getEquipos} idEquipoEdit={null} ></ModalFormularioEquipo>

            </Row>
        </>

    )
}

const TablaEquipos = ({ equipos, getEquipos, refer }) => {

    const [editar, setEditar] = useState(false)
    const [idEquipoEdit, setIdEquipoEdit] = useState(null);
    const [modalConfirmacion, setModalConfirmacion] = useState(false)

    const [paginaActual, setPaginaActual] = useState(1);
    const totalRegistroPorPagina = 6
    const totalPaginas = (Math.ceil(equipos.length > 0 && equipos.length / totalRegistroPorPagina))
    // Partimos los equipos
    const primerRegistro = (paginaActual - 1) * totalRegistroPorPagina
    const ultimoRegistro = primerRegistro + totalRegistroPorPagina
    const registrosPorPagina = equipos.slice(primerRegistro, ultimoRegistro)

    const irAPagina = (index) => {
        setPaginaActual(index)
    }

    const handleDelete = async () => {
        const data = await (await eliminarEquipo(idEquipoEdit)).data
        /* console.log('Eliminacion de club')
        console.log(data) */
        setModalConfirmacion(false);
        getEquipos();
    }

    const mostrarModalConfirmacion = (id) => {
        setIdEquipoEdit(id)
        setModalConfirmacion(true)
    }

    const handleEdit = (id) => {
        /* console.log(id) */
        setIdEquipoEdit(id)
        setEditar(true);
    }

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="table-responsive text-center">
                <table className="table table-striped table-sm border table-bordered table-hover my-2" ref={refer}>
                    <thead>
                        <tr>
                            {ColumnasEquipo.map((e, i) => (
                                <th key={i}>{e}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {registrosPorPagina && registrosPorPagina.map(e => (
                            <tr key={e.id_equipo}>
                                <td onClick={() => handleEdit(e.id_equipo)} >{e.nombre}</td>
                                <td onClick={() => handleEdit(e.id_equipo)}>{e.director}</td>
                                <td id="eliminar">
                                    <Button id="eliminar"
                                        variant="danger"
                                        onClick={() => mostrarModalConfirmacion(e.id_equipo)} >
                                        <Trash3Fill id="eliminar" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination>
                {Array.from(Array(totalPaginas), (e, i) => {
                    return (
                        <Pagination.Item
                            key={i}
                            active={i + 1 === paginaActual}
                            onClick={() => irAPagina(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    )
                })}
            </Pagination>

            {
                <ModalFormularioEquipo titulo={'Editar Equipo'}
                    show={editar}
                    onHide={() => setEditar(false)}
                    idEquipoEdit={idEquipoEdit} getEquipos={getEquipos}></ModalFormularioEquipo>
            }
            {modalConfirmacion &&
                <ModalConfirmacion
                    show={modalConfirmacion}
                    setModalConfirmacion={setModalConfirmacion}
                    titulo={"Mensaje"} mensaje={"Desea eliminar este registro?"} Confirmacion={handleDelete} />}
        </>
    );
}

const ModalFormularioEquipo = ({ titulo, show, onHide, idEquipoEdit, getEquipos }) => {

    const [nombre, setNombre] = useState('')
    const [director, setDirector] = useState('')

    /**
     * Submit
     * @param {} ev 
     * @returns 
     */
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (nombre === '' || director === '') return

        if (idEquipoEdit != null) {
            handleUpdate();
            return
        }
        handleSave();
    }

    /**
     * Guardar
     */
    const handleSave = async () => {
        let newEquipo = {
            nombre,
            director
        }
        try {
            const res = await (await saveEquipo(newEquipo)).data
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        onHide(true);
        getEquipos();
        clearTexts();
    }

    /**
     * Actualizar
     */
    const handleUpdate = async () => {
        let newEquipo = {
            nombre,
            director
        }
        console.log(newEquipo)
        try {
            const res = await (await upadteEquipo(idEquipoEdit, newEquipo)).data
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        onHide(true);
        getEquipos();
        clearTexts()
    }

    const clearTexts = () => {
        setNombre('')
        setDirector('')
    }
    /**
     * 
     * Setea datos para editar 
     */
    const handleEdit = async () => {

        if (idEquipoEdit === null || idEquipoEdit == undefined) {
            return
        }
        const equipo = await (await obtenerEquipo(idEquipoEdit)).data
        /* console.log(equipo) */
        setNombre(equipo.nombre)
        setDirector(equipo.director)
    }

    useEffect(() => {
        handleEdit();
    }, [idEquipoEdit])

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo ?? 'Registro de Equipo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row" onSubmit={handleSubmit}>
                        <Col sm='12'>
                            <Form.Group as={Row}>
                                <Form.Label column sm='3'>Equipo <span className="text-danger">*</span> </Form.Label>
                                <Col sm='9'>
                                    <Form.Control value={nombre} size='sm' onChange={(e) => { setNombre(e.target.value) }} required maxLength='20'></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm='3' className="mb-2">Director <span className="text-danger">*</span></Form.Label>
                                <Col sm='9'>
                                    <Form.Control value={director} size='sm' onChange={(e) => { setDirector(e.target.value) }} required maxLength='20'></Form.Control>
                                </Col>
                            </Form.Group>
                        </Col>
                        <Modal.Footer>
                            <Button variant='danger'>Eliminar <Trash3Fill /></Button>
                            <Button variant='primary' type="submit" >Guardar <SaveFill /></Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}