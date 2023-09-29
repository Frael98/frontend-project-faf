import { Table } from "react-bootstrap";
import { ColumnasAgenda } from "../../models/Columnas";
import { useEffect, useState } from "react"
import { Row, Col, Form, Button, Toast, ToastContainer, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ModalConfirmacion } from '../components/ModalConfirmacion';

export const RegistroAgendaPartido = () => {
    return (
        <>
        <TablaAgenda></TablaAgenda>
        </>
    )
}

const TablaAgenda = () => {



    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {ColumnasAgenda.map(e => (
                            <th key={e}>
                                {e}
                            </th>
                    ))}
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </Table>
        </>
    );
}