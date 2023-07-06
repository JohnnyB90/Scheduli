import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            const response = await fetch("/api/account_settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (response.ok) {
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
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="card" id="settings-color"> 
                        <div className="card-body p-5 account-settings-form">
                            <h1 className="card-title text-Black text-center">
                                Account Settings
                                </h1>
                            <form onSubmit={handleSubmit}>    










            const AccountSettingsPage = () => {
                const [firstName, setFirstName] = useState('');
                const [lastName, setLastName] = useState('');
                const [email, setEmail] = useState('');
                const [phoneNumber, setPhoneNumber] = useState('');
                const [businessName, setBusinessName] = useState('');
                const [businessAddress, setBusinessAddress] = useState('');
                const [zipCode, setZipCode] = useState('');
                const [city, setCity] = useState('');
                const [state, setState] = useState('');
                const [country, setCountry] = useState('');
                const [updateUser] = useMutation(UPDATE_USER);

                const handleFormSubmit = async (event) => {
                    event.preventDefault();
                    const mutationResponse = await updateUser({
                        variables: {
                            firstName: formState.firstName,
                            lastName: formState.lastName,
                            email: formState.email,
                            phoneNumber: formState.phoneNumber,
                            businessName: formState.businessName,
                            businessAddress: formState.businessAddress,
                            zipCode: formState.zipCode,
                            city: formState.city,
                            state: formState.state,
                            country: formState.country,
                        },
                    });
                };

                return (
                    <div>
                        <h2>Account Settings</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Phone Number:
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Business Name:
                                <input
                                    type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Business Address:
                                <input
                                    type="text"
                                    value={businessAddress}
                                    onChange={(e) => setBusinessAddress(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Zip Code:
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                City:
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                State:
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Country:
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </label>
                            <br />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                );
            };

            export default AccountSettingsPage;