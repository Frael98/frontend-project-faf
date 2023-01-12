import { useState } from "react"
import { Form, Row, Col } from "react-bootstrap"


export const RegistroClub = () => {

    const [nombreClub, setNombreClub] = useState('')
    const [direccion, setDireccion] = useState('')
    const [director, setDirector] = useState('')

    return (

        <>
            <Row className="m-4 container">
                <Col sm='6' md='6'>
                    <Form className="card card-body">
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
                    </Form>
                </Col>
            </Row>
        </>

    )
}