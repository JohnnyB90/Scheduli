import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import InputMask from "react-input-mask";
import "./style.css"

function SignupForm() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    businessName: "",
    businessAddress: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
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
    <div className="container my-1">
    <h2>Signup</h2>
    {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
          />
        </div>
      <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
          {formState.email && !isEmailValid && (
            <p className="text-danger">Please enter a valid email address.</p>
          )}
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <InputMask
            mask="999-999-9999"
            placeholder="Phone Number"
            name="phoneNumber"
            type="text"
            id="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="businessName">Business Name:</label>
          <input
            placeholder="Business Name"
            name="businessName"
            type="text"
            id="businessName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="businessAddress">Business Address:</label>
          <input
            placeholder="Business Address"
            name="businessAddress"
            type="text"
            id="businessAddress"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="zipCode">Zip Code:</label>
          <InputMask
            mask="99999"
            placeholder="Zip Code"
            name="zipCode"
            type="text"
            id="zipCode"
            value={formState.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="city">City:</label>
          <input
            placeholder="City"
            name="city"
            type="text"
            id="city"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="state">State:</label>
          <input
            placeholder="State"
            name="state"
            type="text"
            id="state"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="country">Country:</label>
          <input
            placeholder="Country"
            name="country"
            type="text"
            id="country"
            onChange={handleChange}
          />
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
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
        <div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    </div>
  );
}

export default SignupForm;
