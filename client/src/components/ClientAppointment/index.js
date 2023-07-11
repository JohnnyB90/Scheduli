import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import format from "date-fns/format";

export default function ClientAppointment() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const isAM = hours < 12 ? true : false;
  // Set initial dateTime to 12 AM or 12 PM based on current time
  const initialDateTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    isAM ? 0 : 12
  );
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    dateTime: initialDateTime,
  });

  const maxMessageLength = 300;
  const [remainingChars, setRemainingChars] = useState(maxMessageLength);
  const { firstName, lastName, email, phone, message, dateTime } = formState;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const now = new Date();
    const currentHours = now.getHours();
    const selectedDate = new Date(dateTime);
    const selectedHours = selectedDate.getHours();

    // Check if the selected time is AM while the current time is PM
    if (selectedHours < 12 && currentHours >= 12) {
      // Reset the dateTime state
      setFormState((prevState) => ({
        ...prevState,
        dateTime: "",
        appointmentDate: "",
        appointmentTime: "",
      }));
    }
  }, [dateTime]);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name !== "dateTime") {
      setFormState({ ...formState, [name]: value });
    }
  }

  function handleDateTimeChange(value) {
    const formattedDate = format(value, "MM/dd/yyyy");
    const formattedTime = format(value, "hh:mm a");
    setFormState((prevState) => ({
      ...prevState,
      dateTime: value,
      appointmentDate: formattedDate,
      appointmentTime: formattedTime,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Create a copy of formState
    let formToSend = { ...formState };

    try {
      const response = await fetch("/api/appointment_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formToSend), // Send the updated form data
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
                Book an Appointment with us!
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
                  <InputMask
                    mask="(999)-999-9999"
                    maskChar=" "
                    value={phone}
                    onChange={handleChange}
                  >
                    {() => (
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="(999)-999-9999"
                        className="form-control" // Move form-control here
                      />
                    )}
                  </InputMask>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="appointmentDateTime"
                    className="form-label text-black"
                  >
                    Appointment Date
                  </label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DemoContainer
                        components={[
                          "DatePicker",
                          "TimePicker",
                          "DateTimePicker",
                          "DateRangePicker",
                        ]}
                      >
                        <DateTimePicker
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              label="Appointment Date and Time"
                            />
                          )}
                          value={dateTime}
                          onChange={handleDateTimeChange}
                          minDate={new Date()}
                          shouldDisableTime={(time, viewType) => {
                            // If we're looking at days, there's no need to check.
                            if (
                              viewType === "hours" ||
                              viewType === "minutes"
                            ) {
                              const now = new Date();
                              const currentHours = now.getHours();
                              const currentMinutes = now.getMinutes();
                              const currentDay = now.getDate();
                              const selectedDate = dateTime.getDate();

                              if (currentDay === selectedDate) {
                                // If the current time is past 11 AM, disable each hour in the AM
                                if (currentHours >= 11) {
                                  return time.value < 12 * 60;
                                } else {
                                  // If the current time is before 11 AM, disable past hours and minutes
                                  return (
                                    time.value <
                                    currentHours * 60 + currentMinutes
                                  );
                                }
                              }
                            }

                            return false;
                          }}
                          disablePast
                        />
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
