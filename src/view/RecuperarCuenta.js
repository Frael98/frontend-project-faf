import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export const RecuperarCuenta = () => {

    const [correo, setCorreo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({correo})
    }

    return (
        <>
            <Row className='justify-content-center my-2'>
                <Col sm='4'>
                    <Form className='card card-body' onSubmit={handleSubmit}>
                        <div className="card-title text-center">
                            <h4>Recuperar Cuenta</h4>
                            <p>Ingrese su correo!</p>
                        </div>
                        <Form.Group className='mb-2'>
                            <Form.Control onChange={(e) => setCorreo(e.target.value)} placeholder='juan@email.com' type='email' autoFocus></Form.Control>
                        </Form.Group>
                        <Button as="input" type='submit' value="Enviar clave temporal"></Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

