import { Route, Routes } from 'react-router-dom';
import './App.css';
import { NavBar } from "./view/components/NavBar";
import { Login } from "./view/Login";
import { Signup } from "./view/Signup";

function App() {
  return (
    <>
      <NavBar logeado={false}></NavBar>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/sign' element={<Signup/>}></Route>
      </Routes>
    </>
  );
}

export default App;
