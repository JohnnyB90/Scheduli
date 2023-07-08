import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

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

  const {
    firstName,
    lastName,
    email,
    phone,
    message,
    appointmentDate,
    appointmentTime,
  } = formState;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [events, setEvents] = useState([]);

  const dateDropdownRef = useRef(null);
  const timeDropdownRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleDateChange(date) {
    setFormState({ ...formState, appointmentDate: date });
  }

  function handleTimeChange(time) {
    setFormState({ ...formState, appointmentTime: time });
  }

  function handleDateDropdownToggle() {
    if (dateDropdownRef.current.classList.contains("show")) {
      dateDropdownRef.current.classList.remove("show");
    } else {
      dateDropdownRef.current.classList.add("show");
    }
  }

  function handleTimeDropdownToggle() {
    if (timeDropdownRef.current.classList.contains("show")) {
      timeDropdownRef.current.classList.remove("show");
    } else {
      timeDropdownRef.current.classList.add("show");
    }
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
        // Email sent successfully
        setSuccessMessage("Email sent successfully");
        setErrorMessage("");
        // Clear success message after 4 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        setSubmitted(true);

        // Add the form data to the calendar events
        const eventData = await response.json();
        const { id, firstName, lastName, start, end, message } = eventData;
        const newEvent = {
          id,
          title: `${firstName} ${lastName}`,
          start,
          end,
          name: firstName,
          email: formState.email,
          phone: formState.phone,
          specialMessage: message,
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
      } else {
        // Error sending email
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DateTimePicker",
                        "MobileDateTimePicker",
                        "DesktopDateTimePicker",
                        "StaticDateTimePicker",
                      ]}
                    >
                      <DemoItem label="Desktop variant">
                        <DesktopDateTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                        />
                      </DemoItem>
                      <DemoItem label="Mobile variant">
                        <MobileDateTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                        />
                      </DemoItem>
                      <DemoItem label="Responsive variant">
                        <DateTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                        />
                      </DemoItem>
                      <DemoItem label="Static variant">
                        <StaticDateTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
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
                <div className="text-center">
                  <button type="submit" className="btn btn-dark text-white">
                    Submit
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
