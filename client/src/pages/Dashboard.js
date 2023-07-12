import React, { useState } from 'react';
import Navbar from '../components/DashboardNav';
import Calendar from '../components/Calendar';
import AccountSettings from "../components/AccountSettings";
import PasswordSettings from '../components/PasswordSettings';
import AdminAppointment from '../components/AdminAppointment';


function Dashboard() {
    const [navLinks] = useState([
        { name: "Calendar" },
        { name: "View Appointments" },
        { name: "Create Appointment"},
        { name: "Telemetry" },
        { name: "Account Settings" },
        { name: "Password Settings" },
    ]);

    const [currentNav, setCurrentNav] = useState(navLinks[0]);

    return (
        <div>
            <Navbar
                navLinks={navLinks}
                currentLink={currentNav}
                setCurrentLink={setCurrentNav}
            />
            <main>
                {currentNav === navLinks[0] && <Calendar></Calendar>}
                {currentNav === navLinks[1] && <></>}
                {currentNav === navLinks[2] && <AdminAppointment></AdminAppointment>}
                {currentNav === navLinks[3] && <></>}
                {currentNav === navLinks[4] && <AccountSettings></AccountSettings>}
                {currentNav === navLinks[5] && <PasswordSettings></PasswordSettings>}
            </main>
        </div>
    )
}

export default Dashboard;