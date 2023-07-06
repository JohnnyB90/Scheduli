import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

// function AccountSettingsForm() {
//     const [formState, setFormState] = useState({ email: '', password: '' });

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