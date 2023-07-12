import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';

function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);

  useEffect(() => {
    if (Auth.loggedIn()) {
      setShowLoggedInMessage(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
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
    <div className="container my-1">
      {showLoggedInMessage && (
        <div className="alert alert-warning" role="alert">
          You are already logged in. Redirecting to the dashboard...
        </div>
      )}
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            required
          />
          {formState.email && !isEmailValid && (
            <p className="text-danger">Please enter a valid email address.</p>
          )}
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
