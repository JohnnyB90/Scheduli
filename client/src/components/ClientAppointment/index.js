import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Timepicker from "../Timepicker/index.js";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ClientAppointment() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    appointmentDate: null,
    appointmentTime: null,
  });

  const maxMessageLength = 300;
  const [remainingChars, setRemainingChars] = useState(maxMessageLength);

  const { firstName, lastName, email, phone, message } = formState;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/appointment_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSuccessMessage("Email sent successfully");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setSubmitted(true);
      } else {
        setErrorMessage("Error sending email");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error sending email", error);
      setErrorMessage("Error sending email");
      setSuccessMessage("");
    }

    setRemainingChars(maxMessageLength);
  }

  if (submitted) {
    return (
      <section className="container">
        <div className="row justify-content-center m-3">
          <div className="col-md-6 col-lg-8">
            <div className="m-3">
              <h1 className="p-3">Your appointment has been scheduled!</h1>
            </div>
            <div className="card">
              <h4 className="pt-3">
                Thank you, {firstName} {lastName}, for doing business with us.
              </h4>
              <div className="p-3">
                <p className="">
                  A confirmation email has been sent to {email}.
                </p>
                <p className="">
                  If you find that you need to cancel or reschedule your
                  appointment, please contact us via email or phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-8">
          <div className="card m-3" id="header-color">
            <div className="card-body p-5 contact-form">
              <h1 className="card-title text-Black text-center">
                Book an Appointment
              </h1>
              <form onSubmit={handleSubmit}>
                {/* Form Inputs */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label text-black">
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
                  <label htmlFor="lastName" className="form-label text-black">
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
                  <label htmlFor="email" className="form-label text-black">
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
                  <label htmlFor="phone" className="form-label text-black">
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
                  <label
                    htmlFor="appointmentDate"
                    className="form-label text-black"
                  >
                    Appointment Date
                  </label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={[
                          "DatePicker",
                          "TimePicker",
                          "DateTimePicker",
                          "DateRangePicker",
                        ]}
                      >
                        <DemoItem>
                          <DateTimePicker />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-black">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Enter details of your appointment."
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="text-right text-white">
                    {remainingChars}/{maxMessageLength}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-dark text-white">
                    Submit
                  </button>
                </div>
              </form>
              {/* Success and Error Messages */}
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
