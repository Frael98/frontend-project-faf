import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = ({logeado}) => {
    //const logeado = props.logeado
    return (
        <Navbar bg='dark' variant="dark" className='p-3'>
            <Navbar.Brand> Federacion de Arbitros de Futbol</Navbar.Brand>
            {logeado ?
                <Nav>
                    <Nav.Item>
                        <Link className="nav-link" to='/' >Inicio</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className="nav-link" to='/' >Inicio</Link>
                    </Nav.Item>
                </Nav>
                : <></>
            }
        </Navbar>
    )
}