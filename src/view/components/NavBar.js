import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = () => {

    return (
        <Navbar bg='dark' className='p-3'>
            <Navbar.Brand> Federacion de Arbitros de Futbol</Navbar.Brand>
            <Nav>
                <Nav.Item>
                    <Link className="nav-link" to='/' >Inicio</Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}