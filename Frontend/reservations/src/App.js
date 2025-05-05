import logo from './logo.svg';

import Registro from './pages/Registro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Asegúrate de que react-router-dom esté bien instalado.
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/Headers';
import './App.css';
import Home from './componentes/Home.jsx';
import RoomGrid from './pages/imagenes.jsx';
import ReservationForm from './pages/formReservation.jsx';



function App() {
  return (

    <Router>
   <Header></Header> 
      <Routes>
        <Route  path='/'element={<Home></Home>}/>
        <Route path='/registro' element={<Registro></Registro>}></Route>
        <Route path='/reservar/:idRoom' element={<ReservationForm></ReservationForm>}></Route>
      </Routes>
    </Router>
  )



}

export default App;
