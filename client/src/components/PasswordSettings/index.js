import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function PasswordSettings() {
    const [formState, setFormState] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { currentPassword, newPassword, confirmPassword } = formState;
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        // current password validation?

        // new password validation
        if (newPassword !== confirmPassword) {
            setErrorMessage("New password and confirm password must match.");
            return;
        }
        setFormState({ ...formState, [name]: value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try { // use mutation
        // Password change logic
        // ...

        setSuccessMessage("Password successfully updated.");
        setFormState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    }

    return (
        <section className="container">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="card" id="settings-color">
                        <div className="card-body p-5 account-settings-form">
                            <h1 className="card-title text-Black text-center">Password Settings</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="currentPassword" className="form-label text-black">
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
                                    <label htmlFor="newPassword" className="form-label text-black">
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
                                    <label htmlFor="confirmPassword" className="form-label text-black">
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
                                    <button type="submit" className="btn btn-dark text-white">
                                        Change Password
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
