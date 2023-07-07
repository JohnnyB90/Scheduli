import React, { useState } from 'react';
import Navbar from "../components/DashboardNav";
import Calendar from '../components/Calendar';
import AccountSettingsPage from "../components/AccountSettings";


function Dashboard() {
    const [navLinks] = useState([
        { name: "Calendar" },
        { name: "Appointments" },
        { name: "Telemetry" },
        { name: "Account Settings" }
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
                {currentNav === navLinks[2] && <></>}
                {currentNav === navLinks[3] && <AccountSettingsPage></AccountSettingsPage>}
            </main>
        </div>
    )
}

export default Dashboard;