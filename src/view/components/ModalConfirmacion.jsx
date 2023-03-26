import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalConfirmacion = ({show, titulo, mensaje, Confirmacion, setModalConfirmacion}) => {
    return (
        <>
        <Modal show={show} centered onHide={()=> {setModalConfirmacion(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mensaje}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={() => Confirmacion()}>Si</Button>
                <Button variant="outline-secondary"  onClick={()=> {setModalConfirmacion(false)}} >Cancelar</Button>
            </Modal.Footer>

        </Modal>
        </>
    );
}