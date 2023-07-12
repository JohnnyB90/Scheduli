import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useMutation } from "@apollo/client";
import { CREATE_APPOINTMENT } from "../../utils/mutations";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import format from "date-fns/format";
import "./style.css";

export default function ClientAppointment() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const isAM = hours < 12 ? true : false;
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

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  useEffect(() => {
    const now = new Date();
    const currentHours = now.getHours();
    const selectedDate = new Date(dateTime);
    const selectedHours = selectedDate.getHours();

    if (selectedHours < 12 && currentHours >= 12) {
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

    // Check if the name of the field being updated is 'message'
    if (name === "message") {
      // Set the remaining characters based on the updated message length
      setRemainingChars(maxMessageLength - value.length);
    }

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

    const { firstName, lastName, email, phone, message, dateTime } = formState;
    const formattedDate = format(dateTime, "MM/dd/yyyy");
    const formattedTime = format(dateTime, "hh:mm a");
    try {
      const { data } = await createAppointment({
        variables: {
          firstName,
          lastName,
          appointmentDate: formattedDate,
          appointmentTime: formattedTime,
          email,
          phone,
          message,
        },
      });
      if (data) {
        setSuccessMessage("Appointment created successfully");
        setErrorMessage("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setSubmitted(true);
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating appointment", error);
      setErrorMessage("Error creating appointment");
      setSuccessMessage("");
    }

    setRemainingChars(maxMessageLength);
  }

  if (submitted) {
    return (
      <section className="container">
        <div className="row justify-content-center my-3">
          <div className="col-md-6 col-lg-8">
            <div className="p-2 m-y3 conf-header-container">
              <h1 className="p-3 m-0 conf-header">
                Your appointment has been scheduled!
              </h1>
            </div>
            <div className="">
              <div className="m-3 card conf-container">
                <div className="m-3 conf-background">
                  <h4 className="pt-3 appt-text">
                    Thank you, {firstName} {lastName}, for doing business with
                    us.
                  </h4>
                  <div className="p-3">
                    <p className="appt-text">
                      A confirmation email has been sent to {email}.
                    </p>
                    <p className="appt-text">
                      If you find that you need to cancel or reschedule your
                      appointment, please contact us via email or phone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <div className="row justify-content-center m-3">
        <div className="col-md-6 col-lg-8">
          <div className="p-2 my-3 appt-container" id="header-color">
            <div className="m-3 p-5 appt-background">
              <h1 className="text-center appt-text">Book an Appointment</h1>
              <form className="mt-3" onSubmit={handleSubmit}>
                {/* Form Inputs */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label appt-text">
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
                  <label htmlFor="lastName" className="form-label appt-text">
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
                  <label htmlFor="email" className="form-label appt-text">
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
                  <label htmlFor="phone" className="form-label appt-text">
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
                    className="form-label appt-text"
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
                  <label htmlFor="message" className="form-label appt-text">
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
                  <div className="text-right appt-text">
                    {remainingChars}/{maxMessageLength}
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <button type="submit" className="custom-btn appt-button">
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
