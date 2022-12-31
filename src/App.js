import './App.css';
import { NavBar } from "./view/components/NavBar";
import { Login } from "./view/Login";

function App() {
  return (
    <div>
      <NavBar logeado={false}></NavBar>
      <Login></Login>
    </div>
  );
}

export default App;
