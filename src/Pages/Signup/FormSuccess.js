import React from 'react';
import { Link } from 'react-router-dom';
import '../../Templates/Form.css';

const FormSuccess = () => {
  return (
   
    <div className='form-content-right'>
      <h1 className='form-success'>You have successfully registered,
      <Link to="/">Login</Link>
      </h1>
     
      
    </div> 
  ); 
};

export default FormSuccess;
