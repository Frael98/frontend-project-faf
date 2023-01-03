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

function App() {
  const [logeado, setLogeado] = useState(false)
  return (
    <>
      <UsuarioContexto.Provider value={{logeado, setLogeado}}>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/notificaciones' element={<Notificaciones />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </UsuarioContexto.Provider>
    </>
  );
}

export default App;
