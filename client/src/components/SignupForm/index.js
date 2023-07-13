import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import InputMask from "react-input-mask";
import "./signUp.css"

function SignupForm({ handleToggle }) {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    businessName: '',
    businessAddress: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      setErrorMessage('The provided email is already in use by another account.');
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };
  const isEmailValid = validateEmail(formState.email);

  return (
    <div className="container-signup my-3">
      <div id="title" className="mb-3">Signup</div>
      {errorMessage && <p>{errorMessage}</p>}
      <form id="signup-form" onSubmit={handleFormSubmit}>
        <div className="container-form-signup">
          <div className="signup-box">
            <div className="left">
              <div className="right">
                <div className="mb-3">
                  <label className="form-label" htmlFor="firstName">First Name:</label>
                  <input
                    placeholder="First"
                    name="firstName"
                    type="text"
                    id="firstName"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="lastName">Last Name:</label>
                  <input
                    placeholder="Last"
                    name="lastName"
                    type="text"
                    id="lastName"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email:</label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    className="field"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  {formState.email && !isEmailValid && (
                    <p className="text-danger">Please enter a valid email address.</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="phoneNumber">Phone Number:</label>
                  <InputMask
                    mask="999-999-9999"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    className="field"
                    value={formState.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="businessName">Business Name:</label>
                  <input
                    placeholder="Business Name"
                    name="businessName"
                    type="text"
                    id="businessName"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="businessAddress">Business Address:</label>
                  <input
                    placeholder="Business Address"
                    name="businessAddress"
                    type="text"
                    id="businessAddress"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="zipCode">Zip Code:</label>
                  <InputMask
                    mask="99999"
                    placeholder="Zip Code"
                    name="zipCode"
                    type="text"
                    id="zipCode"
                    className="field"
                    value={formState.zipCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="city">City:</label>
                  <input
                    placeholder="City"
                    name="city"
                    type="text"
                    id="city"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="state">State:</label>
                  <input
                    placeholder="State"
                    name="state"
                    type="text"
                    id="state"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="country">Country:</label>
                  <input
                    placeholder="Country"
                    name="country"
                    type="text"
                    id="country"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pwd">Password:</label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="pwd"
                    className="field"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                <button type="submit" className="custom-btn">Signup</button>
                  <button type="submit" className="custom-btn" onClick={handleToggle}>Go to Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
} 

export default SignupForm;
