import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from "./view/components/NavBar";
import { UsuarioContexto } from './view/UsuarioContexto'
import { NotFound } from "./NotFound";
import { Login } from "./view/Login";
import { Signup } from "./view/Signup";
import { Home } from "./view/Home";
import { Notificaciones } from "./view/Notificaciones";
import { RecuperarCuenta } from "./view/RecuperarCuenta";
import { RegistroArbitro } from './view/secretaria/RegistroArbitro';
import { RegistroClub } from './view/secretaria/RegistroClub';
import { RegistroFechaCalendario } from "./view/secretaria/RegistroFechaCalendario";
import { ActasPartido } from "./view/arbitraje/ActasPartido";
import { IngresoAsistencia } from "./view/arbitraje/IngresoAsistencia";

import { Test } from "../src/reportes/ActaPartido";
import { Tablas } from "../src/view/secretaria/test";

function App() {
  const [logeado, setLogeado] = useState(false)
  const [user, setUser] = useState('')
  return (
    <>
      <UsuarioContexto.Provider value={{ logeado, setLogeado, user, setUser }}>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/notificaciones' element={<Notificaciones />} />
          <Route path='/recuperar' element={<RecuperarCuenta />} />
          <Route path='/registro-arbitro' element={<RegistroArbitro />}></Route>
          <Route path='/registro-club' element={<RegistroClub />} />
          <Route path='/registro-calendario' element={<RegistroFechaCalendario />} />
          <Route path='/registro-actas' element={<ActasPartido />} />
          <Route path='/registrar-asistencias' element={< IngresoAsistencia />} />


          <Route path='/test-pdf' element={<Test />} />
          <Route path='/test1' element={<Tablas />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </UsuarioContexto.Provider>
    </>
  );
}

export default App;
