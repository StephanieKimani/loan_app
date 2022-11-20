import React from 'react';
import { Link } from 'react-router-dom';
import '../../Templates/Form.css';

const FormSuccessLogin = () => {
  return (
   
    <div className='form-content-right'>
      <h1 className='form-success'>Please Provide The Correct Credentials
      <br></br>
      <Link to="/" onClick={() => window.location.reload()}>Login</Link>
      </h1>
     
      
    </div> 
  ); 
};

export default FormSuccessLogin;
