import { useEffect, useState } from "react"
import { Form, Row, Col, Modal, Button, Pagination } from "react-bootstrap"
import { ColumnasEquipo } from "../../models/Columnas"
import { listarEquipos, listarEquipos_ } from "../../services/peticiones-arbitro/equipo-re"


export const RegistroClub = () => {

    const [equipos, setEquipos] = useState([]);
    const [show, setShow] = useState(false)
    const [showPDF, setShowPDF] = useState(false);

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
            console.log(value)
            const data = await (await listarEquipos_(value)).data;
            console.log(data)
            setEquipos(data)
        }

    }

    useEffect(() => {
        getEquipos();
    },[])

    return (

        <>
            <h3 className="mx-4 my-2">Registros de Equipo</h3>
            <Row className="justify-content-center">
                <Col md="11" className="my-2 p-2 border g-2 rounded">
                    <Row className="">
                        <Col sm="4">
                            <Button className="" variant="success" onClick={() => setShow(true)}>Nuevo</Button>
                            <Button className="mx-2" onClick={() => { setShowPDF(!showPDF) }}>Imprimir</Button>
                        </Col>
                        <Col sm="8">
                            <Form.Group as={Row} className="justify-content-end text-center">
                                <Form.Label column sm="2">Buscar:</Form.Label>
                                <Col sm="8">
                                    <Form.Control onKeyUp={(e) => filtro(e)} type="text" placeholder="Algo ..." ></Form.Control>
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
                <Col sm='10' className="border rounded my-2">
                    <TablaEquipos getEquipos={getEquipos} equipos={equipos} ></TablaEquipos>
                </Col>

                <ModalFormularioEquipo show={show} onHide={() => setShow(false)} ></ModalFormularioEquipo>

                {showPDF && ''}
            </Row>
        </>

    )
}

const TablaEquipos = ({ equipos, getEquipos }) => {

    const [totalRegistroPorPagina] = useState(6)
    const [totalPaginas] = useState(Math.round(equipos.length / totalRegistroPorPagina))
    const paginas = [];

    for (let index = 1; index <= totalPaginas; index++) {
        paginas.push(
            <Pagination.Item key={index} >{index}</Pagination.Item>
        );
        console.log(index)
    }

    const setearPagination = () => {
        console.log(equipos.length)
        console.log(totalRegistroPorPagina)
        console.log(Math.round(equipos.length / totalRegistroPorPagina))
    }

    useEffect(() => {
        setearPagination();
        /* getEquipos(); */
    }, [])

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-hover my-2">
                    <thead>
                        <tr>
                            {ColumnasEquipo.map(e => (
                                <th key={e}>{e}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {equipos && equipos.map(e => (
                            <tr key={e.id_equipo}>
                                <td>{e.nombre}</td>
                                <td>{e.director}</td>
                                <td>
                                    <Button variant="danger" >Eliminar</Button>
                                    <Button variant="success" >Editar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination>
                {paginas}
            </Pagination>
        </>
    );
}

const ModalFormularioEquipo = ({ titulo, show, onHide }) => {

    const [nombreClub, setNombreClub] = useState('')
    const [direccion, setDireccion] = useState('')
    const [director, setDirector] = useState('')

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo ?? 'Registro de Equipo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group as={Row}>
                            <Form.Label column sm='3'>Nombre Club</Form.Label>
                            <Col sm='8'>
                                <Form.Control size='sm' onChange={(e) => { setNombreClub(e.target.value) }} required maxLength='20'></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm='3'>Direccion</Form.Label>
                            <Col sm='8'>
                                <Form.Control size='sm' onChange={(e) => { setDireccion(e.target.value) }} required maxLength='20'></Form.Control>

                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm='3' >Director</Form.Label>
                            <Col sm='8'>
                                <Form.Control size='sm' onChange={(e) => { setDirector(e.target.value) }} required maxLength='20'></Form.Control>

                            </Col>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant='danger'>Eliminar</Button>
                            <Button variant='primary'>Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}