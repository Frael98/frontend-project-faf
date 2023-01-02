import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from "./view/components/NavBar";

import { NotFound } from "./NotFound";
import { Login } from "./view/Login";
import { Signup } from "./view/Signup";
import { Home } from "./view/Home";

function App() {
  return (
    <>
      {/* <NavBar logeado={false}></NavBar> */}
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/sign' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  );
}

export default App;
