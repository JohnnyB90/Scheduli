import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import './logIn.css'

function LoginForm({ handleToggle }) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);

  useEffect(() => {
    if (Auth.loggedIn()) {
      setShowLoggedInMessage(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [navigate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });

      Auth.login(data.login.token);
      navigate('/dashboard');
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

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };
  const isEmailValid = validateEmail(formState.email);

  return (
    <div className="container login-form-container" style={{ maxWidth: '960px' }}>
      {showLoggedInMessage && (
        <div className="alert alert-warning" role="alert">
          You are already logged in. Redirecting to the dashboard...
        </div>
      )}
      <div className="row justify-content-center my-3">
        <div className="col-md-6 col-lg-8">
          <div className="text-center">
            <h2 className="title">Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="my-3 container-form-login">
                <div className="my-3 form-group">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                  {formState.email && !isEmailValid && (
                    <p className="text-danger">Please enter a valid email address.</p>
                  )}
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
                    <div>
                      <p className="error-text">The provided credentials are incorrect</p>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <button type="submit">Login</button>
                  <button type="login" onClick={handleToggle}>Go to Signup</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default LoginForm;
