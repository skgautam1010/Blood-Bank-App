import React, { useState } from "react";
import PatientDH from "./PatientDH";
import { NavLink } from "react-router-dom";
import {API} from "./backend";

const GetData = async () => {
    var cc = sessionStorage.getItem("username");
    console.log(cc)
    const res = await fetch(`${API}patient_request_history`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: cc })
    });
    const FinalData = await res.json();
    console.log(FinalData);
    var num = document.querySelectorAll(".num");
    num[0].innerHTML = FinalData.data.requests_made;
    num[1].innerHTML = FinalData.data.pending_requests;
    num[2].innerHTML = FinalData.data.approved_requests;
    num[3].innerHTML = FinalData.data.rejected_requests;
}



function backs() {
    window.history.back();
}


function logout() {
    // document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

const PatientDashboard = () => {

    useState(() => {
        GetData()
    })



    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container-fluid position-relative">
                <NavLink className="navbar-brand" to="/"> <h4> <i class="bi bi-heart-fill"></i>  <span className="head">Blood Bank Management System   </span> </h4> </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll nav2">
                    <li className="nav-item">
                        <NavLink className="nav-link" onClick={backs} aria-current="page" to=""> <span className="Icon"> <i className="bi bi-arrow-left-circle p-1 arrow"> </i>   </span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/patient/patientRequest" > <span className="Icon"> <i class="bi bi-hand-index-thumb-fill p-1"></i>  Request </span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/patient/patientHistory"> <span className="Icon">  <i class="bi bi-hourglass-split p-1"></i> History </span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/" onClick={logout}> <span className="Icon"> Logout  <i class="bi bi-box-arrow-right p-1"></i> </span>  </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        <span className="title">Patient Dashboard</ span>
        {/* <PatientDH /> */}

        <div className="container mt-3">
            <div className="row g-3">
                <div className="col-4">
                    <div className="card p-3">
                        <h5 className="card-title">  <i class="bi bi-hand-index-thumb-fill req"></i> Request Made <span className="num"> 10</span> </h5>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card p-3">
                        <h5 className="card-title"> <i class="bi bi-hourglass-top req"></i> Pending Request <span className="num"> 10</span> </h5>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card p-3">
                        <h5 className="card-title">  <i class="bi bi-check-circle-fill req"></i> Approved Request <span className="num"> 10</span> </h5>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card p-3">
                        <h5 className="card-title"> <i class="bi bi-x-circle-fill req"></i> Rejected Request <span className="num"> 10</span> </h5>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default PatientDashboard;