import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalConfirmacion = ({show, titulo, mensaje, Confirmacion, setModalConfirmacion}) => {
    /* const [show, setShow] = useState(false); */


    return (
        <>
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mensaje}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => Confirmacion()}>Si</Button>
                <Button onClick={()=> {setModalConfirmacion(false)}} variant="info">Cancelar</Button>
            </Modal.Footer>

        </Modal>
        </>
    );
}