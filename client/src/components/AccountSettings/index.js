import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import InputMask from "react-input-mask";
import "./style.css";

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

  const displayNameMap = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phoneNumber: "Phone Number",
    businessName: "Business Name",
    businessAddress: "Business Address",
    zipCode: "Zip Code",
    city: "City",
    state: "State",
    country: "Country",
  };

  const [currentField, setCurrentField] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState(""); // New state variable

  const [updateUser] = useMutation(UPDATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!currentField) {
      setErrorMessage("Please select a setting to update.");
      return;
    }

    if (!formState[currentField]) {
      setErrorMessage(`You must enter a new ${currentField}.`);
      return;
    }

    // Custom validation for phoneNumber and zipCode
    if (
      currentField === "phoneNumber" &&
      formState[currentField].includes("_")
    ) {
      setValidationError("Please complete the phone number.");
      return;
    }
    if (currentField === "zipCode" && formState[currentField].includes("_")) {
      setValidationError("Please complete the zip code.");
      return;
    }

    try {
      const variables = { [currentField]: formState[currentField] };

      const { data } = await updateUser({ variables });

      if (data) {
        setSuccessMessage("Your account settings have been updated.");
        setErrorMessage("");
        setValidationError(""); // clear validation error on success
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }

    // Reset the form state
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

    // Reset the selected field
    setCurrentField("");
  }

  return (
    <section className="container">
      <div className="my-3 row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card acc-border" id="settings-color">
            <div className="m-3 p-5 account-settings-form acc-background">
              <h1 className="card-title acc-text text-center mb-3">
                Account Settings
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="selectedSetting"
                    className="form-label acc-text p-3"
                  >
                    Choose Setting to Update
                  </label>
                  <select
                    id="selectedSetting"
                    name="selectedSetting"
                    value={currentField}
                    onChange={(e) => setCurrentField(e.target.value)}
                  >
                    <option value="">Select a setting</option>
                    <option value="email">Email</option>
                    <option value="phoneNumber">Phone Number</option>
                    <option value="businessName">Business Name</option>
                    <option value="businessAddress">Business Address</option>
                    <option value="zipCode">Zip Code</option>
                    <option value="city">City</option>
                    <option value="state">State</option>
                    <option value="country">Country</option>
                  </select>
                </div>
                {currentField === "phoneNumber" && (
                  <div className="mb-3">
                    <label
                      htmlFor={currentField}
                      className="form-label acc-text m-3"
                    >
                      {displayNameMap[currentField]}
                    </label>
                    <InputMask
                      mask="999-999-9999"
                      type="text"
                      id={currentField}
                      name={currentField}
                      value={formState[currentField]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                {currentField === "zipCode" && (
                  <div className="mb-3">
                    <label
                      htmlFor={currentField}
                      className="form-label acc-text m-3"
                    >
                      {displayNameMap[currentField]}
                    </label>
                    <InputMask
                      mask="99999"
                      type="text"
                      id={currentField}
                      name={currentField}
                      value={formState[currentField]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                {currentField &&
                  currentField !== "phoneNumber" &&
                  currentField !== "zipCode" && (
                    <div className="mb-3">
                      <label
                        htmlFor={currentField}
                        className="form-label acc-text m-3"
                      >
                        {displayNameMap[currentField]}
                      </label>
                      <input
                        type="text"
                        id={currentField}
                        name={currentField}
                        value={formState[currentField]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                <div className="d-grid gap-2">
                  <button type="submit" className="btn acc-button mt-3">
                    Update Account Settings
                  </button>
                </div>
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
                {validationError && (
                  <div className="text-danger mt-3 text-bold text-center">
                    {validationError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
