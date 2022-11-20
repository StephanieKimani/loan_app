import React, { useState } from 'react';
import '../../Templates/Form.css';
import FormLogin from './FormLogin';
import FormSuccessLogin from './FormSuccessLogin';

const Formtwo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
    return(console.log(isSubmitted))
  }
 
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/loan3.jpg' alt='wallet' />
        </div>
        {!isSubmitted ? (
          <FormLogin submitForm={submitForm} />):
          (<FormSuccessLogin/>)}
      </div>
    </>
  );
};

export default Formtwo;
