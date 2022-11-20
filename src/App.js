import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Form from './Pages/Signup/Form';
import Formtwo from './Pages/Login/Formtwo';
import ClientLandingPage from './Pages/Client/ClientLandingpage';
import Underwriter from './Pages/Underwriter/Underwriter';
import LoanView from './Pages/Underwriter/LoanView';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
  <>
    <Router>
    {/*   <Navbar/>   */} 
      <Routes>
      <Route path ='/' element = {<Formtwo/>} /> 
      <Route path ='/register' element = {<Form/>} /> 
      <Route path ='/successful-clientlogin' element = {<ClientLandingPage/>} />
      <Route path ='/successful-underwriterlogin' element = {<Underwriter/>} />
      <Route path ='/underwriter-process' element = {<LoanView/>} /> 
      </Routes>
  </Router>
  
  </> 
  );
}

export default App;
