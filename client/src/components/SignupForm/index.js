import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import './signUp.css';

function SignupForm() {
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

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
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

  
  return (
    <div className="container-signup my-3">
      <div id="title" className="mb-3">Signup</div>
      <form id="signup-form" onSubmit={handleFormSubmit}>
        {/* <body> */}
        <div className="container-form-signup">
          <div className="signup-box">
            <div className="left">
              <div className="right">
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            className="field"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            className="field"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            className="field"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="Phone Number"
            className="field"
            name="phoneNumber"
            type="text"
            id="phoneNumber"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="businessName">Business Name:</label>
          <input
            placeholder="Business Name"
            className="field"
            name="businessName"
            type="text"
            id="businessName"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="businessAddress">Business Address:</label>
          <input
            placeholder="Business Address"
            className="field"
            name="businessAddress"
            type="text"
            id="businessAddress"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="zipCode">Zip Code:</label>
          <input
            placeholder="Zip Code"
            className="field"
            name="zipCode"
            type="text"
            id="zipCode"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="city">City:</label>
          <input
            placeholder="City"
            className="field"
            name="city"
            type="text"
            id="city"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="state">State:</label>
          <input
            placeholder="State"
            className="field"
            name="state"
            type="text"
            id="state"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="country">Country:</label>
          <input
            placeholder="Country"
            className="field"
            name="country"
            type="text"
            id="country"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            placeholder="******"
            className="field"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        </div>
        <div className="flex-row flex-end">
          <button type="submit" className="btn-submit">Submit</button>
        </div>
        </div>
        </div>
        </div>
        {/* </body> */}
      </form>
    </div>
  );
}

export default SignupForm;