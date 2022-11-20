import React, { useState } from 'react';
import ClientForm from './ClientForm';
import ClientSuccess from './ClientSuccess';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Client.css';



const ClientLandingpage = () => {
  let token = localStorage.getItem('token')
  if (!token){
  window.location.href="http://localhost:3000" 
  }

  function tokenDestroy(){
    localStorage.removeItem('token')
      }
  
  const [isSubmitted, setIsSubmitted] = useState(false);


  function submitForm() {
    setIsSubmitted(true);
  }
  return (
      <div >
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Text >
                  Welcome <span>{localStorage.getItem("username")}</span>
                </Navbar.Text>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                  <Nav.Link  href="/" onClick={()=>tokenDestroy()}>
                    Log out
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        <div className='landingpage' >
        {!isSubmitted ? (<ClientForm submitForm={submitForm} />) : (<ClientSuccess/>)}
  </div>

  </div>
  )
}

export default ClientLandingpage