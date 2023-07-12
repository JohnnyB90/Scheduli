import React, { useState } from "react";
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
// import { redirect } from 'react-router-dom';
import './logIn.css';

function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });

      Auth.login(data.login.token);
      // we tried react redirect, but it broke
      // redirect('/dashboard');
      window.location.replace('/dashboard')
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    <div className="container login-form-container" style={{maxWidth: '960px'}}>
      <div className="row justify-content-center my-3">
        <div className="col-md-6 col-lg-8">
          <div className="text-center">
            <h2 className="title">Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="my-3 container-form-login">
                <div className="my-3 form-group">
                  <label htmlFor="email" className="form-label">Email address:</label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="pwd" className="form-label">Password:</label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  {error ? (
                    <p className="error-text">The provided credentials are incorrect</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginForm;