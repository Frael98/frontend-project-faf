import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { listarArbitros, obtenerArbitro } from '../../services/peticiones-arbitro/arbitro-re'

/* const datos = [
    { nombre: 'Juan', apellido: 'Perez' },
    { nombre: 'Maria', apellido: 'Gonzalez' },
    { nombre: 'Luis', apellido: 'Garcia' },
]; */

export const TablaDatos = () => {
    const [show, setShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [datos, setDatos] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = async (row) => {
        const data = await (await obtenerArbitro(row)).data 
        setSelectedRow(data);
        console.log(selectedRow)
        setShow(true);
    };

    const handleSave = () => {
        // Aquí puedes hacer algo con los valores actualizados del formulario
        handleClose();
    };


    const getArbitros = async () => {
        const datos = await (await listarArbitros()).data;
        setDatos(datos);
    }

    useEffect(() => {
        getArbitros();
    })

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos && datos.map((row, index) => (
                        <tr key={index}>
                            <td>{row.nombre}</td>
                            <td>{row.apellidos}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShow(row.id_arbitro)}>
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedRow && (
                <FormularioModal
                    show={show}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    selectedRow={selectedRow}
                />
            )}
        </>
    );
};


const FormularioModal = ({ show, handleClose, handleSave, selectedRow }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        defaultValue={selectedRow.nombre}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellido"
                        defaultValue={selectedRow.apellidos}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};



