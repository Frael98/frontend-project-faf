import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastMessage({ message, type, alerta, setAlerta }) {

    return (
        <>
            <ToastContainer position="middle-center" >
                <Toast bg="dark" onClose={() => setAlerta(false)} show={alerta} animation={true} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Info</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{message} <span className="text-danger">*</span>.</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}