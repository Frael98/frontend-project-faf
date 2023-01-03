import React, {useContext} from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UsuarioContexto } from "../UsuarioContexto";

export const NavBar = (/* {logeado} */) => {
    //const logeado = props.logeado
    const {logeado} = useContext(UsuarioContexto)
    
    return (
        <Navbar bg='dark' variant="dark" className='p-3'>
            <Navbar.Brand> Federacion de Arbitros de Futbol</Navbar.Brand>
            {logeado ?
                <Nav>
                    <Nav.Item>
                        <Link className="nav-link" to='/home' >Inicio</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to='/notificaciones' >Notificaciones</Link>
                    </Nav.Item>
                </Nav>
                : <></>
            }
        </Navbar>
    )
}