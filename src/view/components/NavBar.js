import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioContexto } from "../UsuarioContexto";

export const NavBar = () => {

    const { logeado, setLogeado, user } = useContext(UsuarioContexto)
    const navigate = useNavigate();

    const handleLogout = () => {
        setLogeado(!logeado)
        navigate("/")
    }
    return (
        <Navbar bg='dark' variant="dark" className='p-3'>
            <Container>
                <Navbar.Brand> Federacion de Arbitros de Futbol</Navbar.Brand>
                {logeado ?
                    <>
                        <Nav>
                            <Nav.Item>
                                <Link className="nav-link" to='/home' >Inicio</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link className="nav-link" to='/notificaciones' >Notificaciones</Link>
                            </Nav.Item>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Navbar.Toggle />
                                <NavDropdown title={<Navbar.Text>
                                    Usuario: <a href="#login">{user}</a>
                                </Navbar.Text>} id="basic-nav-dropdown">
                                    <NavDropdown.Item >Editar Perfil</NavDropdown.Item>
                                    <NavDropdown.Item >Tema oscuro </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Cerrar Sesion
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse></>
                    : <></>
                }
            </Container>

        </Navbar>

    )
}