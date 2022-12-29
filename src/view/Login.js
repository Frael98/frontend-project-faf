import { Form } from "react-bootstrap";
import React from "react";

export const Login = () => {
    return(
        <Form>
            <Form.Floating>
                <Form.Label>Usuario</Form.Label>
                <Form.Control placeholder="Usuario" ></Form.Control>
            </Form.Floating>

            <Form.Floating>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control placeholder="Contraseñ" type="password"></Form.Control>
            </Form.Floating>
        </Form>
    )
}