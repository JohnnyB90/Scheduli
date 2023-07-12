import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import './style.css';


export default function AccountSettings() {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        businessName: "",
        businessAddress: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
    });

    const { firstName, lastName, email, phoneNumber, businessName, businessAddress, zipCode, city, state, country } = formState;
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [updateUser] = useMutation(UPDATE_USER);

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "phoneNumber") {
            if (value.length > 10) {
                setErrorMessage("Phone number must not exceed 10 digits.");
                return;
            } else if (value.length === 10 && !/^\d{10}$/.test(value)) {
                setErrorMessage("Phone number must be exactly 10 digits.");
                return;
            } else {
                setErrorMessage("");
            }
        }

        if (name === "email") {
            if (value.length > 50) {
                setErrorMessage("Email must not exceed 50 characters.");
                return;
            } else if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
                setErrorMessage("Please enter a valid email address.");
                return;
            }
        }

        setFormState({ ...formState, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data } = await updateUser({
                variables: {
                    firstName,
                    lastName,
                    email,
                    password: "", // Pass the password if needed
                    phoneNumber,
                    businessName,
                    businessAddress,
                    zipCode,
                    city,
                    state,
                    country
                }
            });
            console.log(data);

            if (data) {
                setSuccessMessage("Your account settings have been updated.");
                setErrorMessage("");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
            setSuccessMessage("");
        }

        setFormState({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            businessName: "",
            businessAddress: "",
            zipCode: "",
            city: "",
            state: "",
            country: "",
        });
    }

    return (
        <section className="container">
            <div className="my-3 row justify-content-center">
                <div className="col-md-6 col-sm-12">
                    <div className="card acc-border" id="settings-color"> 
                        <div className=" m-3 p-5 account-settings-form acc-background">
                            <h1 className="card-title acc-text text-center">
                                Account Settings
                                </h1>
                            <form onSubmit={handleSubmit}>    
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label acc-text">
                                        First Name
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label acc-text">
                                        Last Name
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label acc-text">
                                        Email
                                        </label>
                                    <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label acc-text">
                                        Phone Number
                                        </label>
                                    <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="businessName" className="form-label acc-text">
                                        Business Name
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="businessName"
                                    name="businessName"
                                    value={businessName}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="businessAddress" className="form-label acc-text">
                                        Business Address
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="businessAddress"
                                    name="businessAddress"
                                    value={businessAddress}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="zipCode" className="form-label acc-text">
                                        Zip Code
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"    
                                    id="zipCode"
                                    name="zipCode"
                                    value={zipCode}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label acc-text">
                                        City
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label acc-text">
                                        State
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    name="state"
                                    value={state}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label acc-text">
                                        Country
                                        </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn acc-button">
                                        Update Account Settings
                                        </button>
                                </div>
                            </form>
                            {successMessage && (
                                <div className="text-success mt-3 text-black text-bold text-center">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="text-danger mt-3 text-black text-bold text-center">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}