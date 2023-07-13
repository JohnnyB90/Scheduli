import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { useNavigate } from "react-router-dom";
import AuthService from '../../utils/auth';
import InputMask from "react-input-mask";
import "./style.css";

const FormField = ({ field, displayName, value, onChange }) => {
  if (field === "phoneNumber") {
    return (
      <div className="mb-3">
        <label htmlFor={field} className="form-label acc-text m-3">
          {displayName}
        </label>
        <InputMask
          mask="999-999-9999"
          type="text"
          id={field}
          name={field}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }

  if (field === "zipCode") {
    return (
      <div className="mb-3">
        <label htmlFor={field} className="form-label acc-text m-3">
          {displayName}
        </label>
        <InputMask
          mask="99999"
          type="text"
          id={field}
          name={field}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label acc-text m-3">
        {displayName}
      </label>
      <input
        type="text"
        id={field}
        name={field}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default function AccountSettings() {
  const navigate = useNavigate();
  const decodedToken = AuthService.getProfile();
  const userId = decodedToken ? decodedToken.data._id : null;
  const { loading, error, data, refetch } = useQuery(QUERY_USER, {
    fetchPolicy: 'network-only',
    variables: { userId },
  });
  
  const [showUpdateSettings, setShowUpdateSettings] = useState(false);
  const [formState, setFormState] = useState({
    firstName: loading || error ? "" : data.user.firstName,
    lastName: loading || error ? "" : data.user.lastName,
    email: loading || error ? "" : data.user.email,
    phoneNumber: loading || error ? "" : data.user.phoneNumber,
    businessName: loading || error ? "" : data.user.businessName,
    businessAddress: loading || error ? "" : data.user.businessAddress,
    zipCode: loading || error ? "" : data.user.zipCode,
    city: loading || error ? "" : data.user.city,
    state: loading || error ? "" : data.user.state,
    country: loading || error ? "" : data.user.country,
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
  const [validationError, setValidationError] = useState("");

  const [updateUser] = useMutation(UPDATE_USER);

  // Function to generate the appointment URL
  const getAppointmentUrl = (userId) => {
    return `https://scheduli-adfba105dbbc.herokuapp.com/appointment/${userId}`;
  };

  useEffect(() => {
    if (successMessage) {
      // Refresh the user data after successful update
      refetch();
    }
  }, [successMessage, refetch]);

  if (loading) {
    // Add loading state if needed
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state if needed
    return <div>Error occurred while fetching user data.</div>;
  }

  const userData = data.user;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleUpdateSettingsClick = () => {
    setShowUpdateSettings(true);
  };

  const handleCancelUpdate = () => {
    setShowUpdateSettings(false);
    setCurrentField("");
    setSuccessMessage("");
    setErrorMessage("");
    setValidationError("");
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
        setValidationError("");
        setTimeout(() => {
          setSuccessMessage("");
          // Redirect to account settings page after 2 seconds
          navigate("/dashboard");
        }, 2000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
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

    setCurrentField("");
  }

  const settingsKeys = Object.keys(formState);
  const totalSettings = settingsKeys.length;
  const middleIndex = Math.ceil(totalSettings / 2);

  return (
    <section className="container">
      <div className="my-3 row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card acc-border">
            <div className="m-3 p-5 account-settings-form acc-background">
              <h1 className="card-title acc-text text-center mb-3">
                Account Settings
              </h1>
               {/* Add the generated URL here */}
               <p>Share this URL for client appointments: <a href={getAppointmentUrl(userId)}>{getAppointmentUrl(userId)}</a></p>

            {/* Display current user settings */}
            {!showUpdateSettings && (
                <div>
                  <h2>Current User Settings</h2>
                  <div className="row">
                    <div className="col-md-6">
                      {settingsKeys.slice(0, middleIndex).map((key) => (
                        <div key={key} className="mt-3">
                          <label className="acc-text">
                            {displayNameMap[key]}
                          </label>
                          <p className="mt-1">{userData[key]}</p>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-6">
                      {settingsKeys.slice(middleIndex).map((key) => (
                        <div key={key} className="mt-3">
                          <label className="acc-text">
                            {displayNameMap[key]}
                          </label>
                          <p className="mt-1">{userData[key]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="acc-button custom-btn mt-4"
                    onClick={handleUpdateSettingsClick}
                  >
                    Update User Settings
                  </button>
                </div>
              )}

              {/* Update user settings form */}
              {showUpdateSettings && (
                <div>
                  <form onSubmit={handleSubmit}>
                    <h2>Update your Settings</h2>
                    <div className="mb-3">
                      <div>
                      <label
                        htmlFor="selectedSetting"
                        className="form-label acc-text p-3"
                      >
                        Choose Setting to Update
                      </label>
                      </div>
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
                        <option value="businessAddress">
                          Business Address
                        </option>
                        <option value="zipCode">Zip Code</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                        <option value="country">Country</option>
                      </select>
                    </div>
                    {currentField && (
                      <FormField
                        field={currentField}
                        displayName={displayNameMap[currentField]}
                        value={formState[currentField]}
                        onChange={handleChange}
                      />
                    )}
                    <div className="d-grid gap-2">
                      <button type="submit" className="custom-btn acc-button mt-3">
                        Save
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
                  <div className="d-grid gap-2">
                  <button type="submit"
                    className="custom-btn acc-button mt-3"
                    onClick={handleCancelUpdate}
                  >
                    Back
                  </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
