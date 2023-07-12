import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from "../../utils/mutations";
import { set } from "mongoose";

export default function PasswordSettings() {
    const [formState, setFormState] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { currentPassword, newPassword, confirmPassword } = formState;
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [updatePassword] = useMutation(UPDATE_PASSWORD);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }
  
    async function handleSubmit(event) {
        event.preventDefault();

        if (currentPassword.trim() === "") {
            setErrorMessage("Please enter your current password.");
            return;
          }
      
          if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password must match.");
            return;
          }

        try { 
            const { data } = await updatePassword({
                variables: { currentPassword, newPassword, confirmPassword },
            });

        if (data) {
            setSuccessMessage("Your password has been updated.");
                setErrorMessage("");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 5000);
        } else {
            setErrorMessage("Error changing password");
            setSuccessMessage("");
        }
    } catch (error) {
        console.error("Error changing password", error);
        setErrorMessage("Error changing password");
    }
    setFormState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    console.log(currentPassword, newPassword, confirmPassword);
}

    return (
        <section className="container">
            <div className="mt-3 row justify-content-center">
                <div className="col-md-6 col-sm-12">
                    <div className="card pw-border" id="settings-color">
                    <div className="m-3 p-5 pw-background account-settings-form">
                        <h1 className="card-title pw-text text-center">Password Settings</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label pw-text">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={currentPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label pw-text">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label pw-text">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="custom-btn pw-button">
                                    Change Password
                                </button>
                            </div>
                        </form>
                        {successMessage && (
                            <div className="text-success mt-3 pw-text text-bold text-center">
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