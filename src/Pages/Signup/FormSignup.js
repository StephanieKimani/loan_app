import React from 'react';
import validateInfo from '../../Templates/validateInfo';
import useForm from '../../Templates/useForm';
import '../../Templates/Form.css';
import { Link } from 'react-router-dom';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateInfo
  );
// form content
  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! .
        </h1>
        {/*Username form input */}
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        {/*AccountNo form input */}
        <div className='form-inputs'>
          <label className='form-label'>Account Number</label>
          <input
            className='form-input'
            type='text'
            name='accountNo'
            placeholder='Enter your account number'
            value={values.accountNo}
            onChange={handleChange}
          />
          {errors.accountNo && <p>{errors.accountNo}</p>}
        </div>

        {/*Email form input */}
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        {/*Password form input */}
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login 
          <Link to="/"> here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;