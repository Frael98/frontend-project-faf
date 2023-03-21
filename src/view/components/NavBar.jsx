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
                                        <NavDropdown.Item as={Link} to='/registro-arbitro'>Crear/Modifcar Arbitros</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to='/registro-club'>Crear/Modificar Clubs </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to='/registro-actas'>Registro de Actas </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to='/realizar-sorteos'>Realizar Sorteos</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to='/registro-calendario'>Agendar Partidos</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to='/registrar-asistencias'>Registrar Asistencia de Partidos</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title='Consultas' id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to='/consultar-sorteos'>Consultar Sorteos</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to='/consultar-actas'>Consultar Actas de Partidos </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to='/consultar-asistencias'>Consultar Arbitros Asistencias</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown className="align-self-end" title={<Navbar.Text>
                                        Usuario: {user.usuario}
                                    </Navbar.Text>} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to='' >Editar Perfil</NavDropdown.Item>
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