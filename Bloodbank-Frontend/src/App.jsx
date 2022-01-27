import React from "react";
import "./i18n";
import { Routes, Route } from "react-router-dom";
import Patient_login from "./Patient_login";
import Admin_login from "./Admin_login";
import Donor_login from "./Donor";
import "./Style.css";
import Home from "./Home";
import PatientDashboard from "./PatientDashboard";
import PatientRequest from "./PatientRequest";
import PatientHistory from "./PatientHistory";
import DonorDashboard from "./DonorDashboard";
import DonorRequest from "./DonorRequest";
import DonorHistory from "./DonorHistory";
import Admin_dashboard from "./Admin_dashboard";
import AdminDonor from "./AdminDonor";
import AdminRequest from "./AdminRequest";
import AdminPatient from "./AdminPatient";
import AdminHistory from "./AdminHistory";
import AdminSubscriber from "./AdminSubscriber";


const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/patient/login" element={<Patient_login />} />
                <Route path="/patient/patientDashboard" element={<PatientDashboard />} />
                <Route path="/patient/patientRequest" element={<PatientRequest />} />
                <Route path="/patient/patientHistory" element={<PatientHistory />} />


                <Route path="/donor/login" element={<Donor_login />} />
                <Route path="/donor/donorDashboard" element={<DonorDashboard />} />
                <Route path="/donor/donorRequest" element={<DonorRequest />} />
                <Route path="/donor/donorHistory" element={<DonorHistory />} />



                <Route path="/admin/login" element={<Admin_login />} />
                <Route path="/admin/dashboard" element={<Admin_dashboard />} />
                <Route path="/admin/donor" element={<AdminDonor />} />
                <Route path="/admin/patient" element={<AdminPatient />} />
                <Route path="/admin/request" element={<AdminRequest />} />
                <Route path="/admin/history" element={<AdminHistory />} />
                <Route path="/admin/subscriber" element={<AdminSubscriber />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;