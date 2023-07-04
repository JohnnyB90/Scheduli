import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const maxMessageLength = 300;
  const [remainingChars, setRemainingChars] = useState(maxMessageLength);

  const { firstName, lastName, email, phone, message } = formState;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "phone") {
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

    if (name === "message") {
      if (value.length > maxMessageLength) {
        setErrorMessage("Message must not exceed 300 characters.");
        return;
      } else {
        setRemainingChars(maxMessageLength - value.length);
        setErrorMessage("");
      }
    }

    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("/api/appointment_details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (response.ok) {
          // Email sent successfully
          setSuccessMessage("Email sent successfully");
          setErrorMessage("");
          // Clear success message after 4 seconds
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        } else {
          // Error sending email
          setErrorMessage("Error sending email");
          setSuccessMessage("");
        }
      })
      .catch((error) => {
        console.error("Error sending email", error);
        setErrorMessage("Error sending email");
        setSuccessMessage("");
      });

    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });

    setRemainingChars(maxMessageLength);
  }

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card" id="header-color">
            <div className="card-body p-5 contact-form">
              <h1 className="card-title text-white text-center">
                Book an Appointment
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email address here"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label text-white">
                    Phone number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-white">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Describe your project"
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="text-right text-white">
                    {remainingChars}/{maxMessageLength}
                  </div>
                </div>
                <div className="mb-3 text-center">
                  {" "}
                  {/* Add the 'text-center' class */}
                  <button type="submit" className="btn btn-dark text-white">
                    Submit
                  </button>
                </div>
              </form>
              {successMessage && (
                <div className="text-success mt-3 text-white text-bold text-center">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-danger mt-3 text-white text-bold text-center">
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
