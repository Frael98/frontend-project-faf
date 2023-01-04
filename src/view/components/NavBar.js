import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown, Container, NavLink } from "react-bootstrap";
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
        <>
            <Navbar bg='dark' variant="dark" className='p-3'>
                <Container>
                    <Navbar.Brand> Federacion de Arbitros de Futbol</Navbar.Brand>
                    {logeado ?
                        <>
                            <Nav>
                                <NavLink as={Link} to="/home">
                                    Inicio
                                </NavLink>
                                <NavLink as={Link} to='/notificaciones'>
                                    Notificaciones
                                </NavLink>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Nav>
                                    <Navbar.Toggle />
                                    <NavDropdown title={<Navbar.Text>
                                        Usuario: <Link href="#login">{user}</Link>
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
        </>
    )
}