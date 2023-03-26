import { Table } from "react-bootstrap";
import { ColumnasAgenda } from "../../models/Columnas";

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