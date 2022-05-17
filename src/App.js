import { useState } from 'react';
import validator from 'validator';
import './App.css';

const App = () => {
  const [signUpInput, setSignUpInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signUpInput.email)) {
      return setError('The email you input is invalid');
    } else {
      if (signUpInput.password.length <= 5) {
        return setError('The password must be more than 5 symbols');
      } else {
        if (signUpInput.password !== signUpInput.confirmPassword) {
          return setError('Passwords dont match');
        }
      }
    }
  };

  return (
    <div className='container my-5'>
      <h3 className='mb-3'>Unit Testing for Form</h3>
      <form className='form' name='form'>
        <div className='mb-3'>
          <label className='form-label' htmlFor='email'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            value={signUpInput.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-control'
            value={signUpInput.password}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            className='form-control'
            value={signUpInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button onClick={handleClick} className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
