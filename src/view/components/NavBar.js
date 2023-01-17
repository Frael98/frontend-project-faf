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
            <Navbar bg='dark' variant="dark tabs" className='p-3' expand='lg'>
                <Container fluid>
                    <Navbar.Brand> Federacion de Arbitros de Futbol</Navbar.Brand>
                    {logeado ?
                        <>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll1">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll>
                                    <NavLink as={Link} to="/home">
                                        Inicio
                                    </NavLink>
                                    <Nav.Link as={Link} to='/notificaciones'>
                                        Notificaciones
                                    </Nav.Link>
                                    
                                    <NavDropdown title='Crear/Modificar' id="basic-nav-dropdown">
                                        <NavDropdown.Item href='/registro-arbitro'>Crear/Modifcar Arbitros</NavDropdown.Item>
                                        <NavDropdown.Item href='/registro-club'>Crear/Modificar Clubs </NavDropdown.Item>
                                        <NavDropdown.Item href='/registro-secretario'>Crear/Modificar Clubs </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} >
                                           Crear/Modificar Fecha Calendario
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title='Consultar/Modificar' id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to=''>Consultar/Modifcar Arbitros</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to=''>Consultar/Modificar Clubs </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} >
                                           Consultar/Modificar Fecha Calendario
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown className="align-self-end" title={<Navbar.Text>
                                        Usuario: {user}
                                    </Navbar.Text>} id="basic-nav-dropdown">
                                        <NavDropdown.Item >Editar Perfil</NavDropdown.Item>
                                        <NavDropdown.Item >Tema oscuro </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>
                                            Cerrar Sesion
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                            
                        </>
                        : <></>
                    }
                </Container>

            </Navbar>
        </>
    )
}