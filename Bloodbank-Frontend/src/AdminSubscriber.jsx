import React , {useState} from 'react';
import { NavLink } from "react-router-dom";

const Getdonordata = async () => {
    const res = await fetch("http://localhost:8000/admin_donor_detail")
    const FinalData = await res.json();
    console.log(FinalData.data);
    var reqmad = document.querySelectorAll(".apnd");
    for (var a = 0; a < FinalData.data.length; a++) {
        reqmad[0].insertAdjacentHTML("beforeend", `
         <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">${FinalData.data[a].fname}</li>
                    <li class="list-group-item col">${FinalData.data[a].lname}</li>
                    <li class="list-group-item col">${FinalData.data[a].bgroup}</li>
                    <li class="list-group-item col">${FinalData.data[a].username}</li>
                    <li class="list-group-item col">${FinalData.data[a].phone}</li>
                    <li class="list-group-item col">${(FinalData.data[a].city)}</li>
                    <li class="list-group-item col">${FinalData.data[a].state}</li>
                </ul>
    `)}
    
}
const Getpatientdata = async () => {
    const res = await fetch("http://localhost:8000/admin_patient_detail")
    const FinalData = await res.json();
    console.log(FinalData.data);
    var reqmad = document.querySelectorAll(".apndd");
    for (var a = 0; a < FinalData.data.length; a++) {
        reqmad[0].insertAdjacentHTML("beforeend", `
         <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">${FinalData.data[a].fname}</li>
                    <li class="list-group-item col">${FinalData.data[a].lname}</li>
                    <li class="list-group-item col">${FinalData.data[a].bgroup}</li>
                    <li class="list-group-item col">${FinalData.data[a].username}</li>
                    <li class="list-group-item col">${FinalData.data[a].phone}</li>
                    <li class="list-group-item col">${(FinalData.data[a].city)}</li>
                    <li class="list-group-item col">${FinalData.data[a].state}</li>
                </ul>
    `)}
}

function backs() {
    window.history.back();
}

const AdminSubscriber = () => {
    useState(() => {
        Getdonordata();
        Getpatientdata();
    })
    return (<>
        <div className="overflow-hidden">
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container-fluid position-relative">
                <NavLink className="navbar-brand" to="/"> <h4> <i class="bi bi-heart-fill"></i>  <span className="head">Blood Bank Management System</span> </h4> </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll nav1">
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/admin/donor"> <span className="Icon"> <i class="bi bi-people-fill p-1"></i> Donor </span>  </NavLink>
                    </li>
                    <li className="nav-item mx-1">                         <NavLink className="nav-link" to="/admin/patient"> <span className="Icon"> <i class="bi bi-activity p-1"></i> Patient </span>  </NavLink>
                    </li>                    */}
                    <li className="nav-item">
                        <NavLink className="nav-link" onClick={backs} aria-current="page" to=""> <span className="Icon"> <i className="bi bi-arrow-left-circle p-1 arrow"> </i>   </span>  </NavLink>
                    </li>
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link" to="/admin/request"> <span className="Icon"><i class="bi bi-hand-index-thumb-fill p-1"></i> Request </span>  </NavLink>
                    </li>
                    <li className="nav-itemmx-1">
                        <NavLink className="nav-link" to="/admin/history">  <span className="Icon"> <i class="bi bi-hourglass-split p-1"></i>  History </span>  </NavLink>
                    </li>
                    <li className="nav-itemmx-1">
                        <NavLink className="nav-link" to="/admin/subscriber">  <span className="Icon"> <i class="bi bi-person-square p-1"></i> Subscribers</span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="lang">  <span className="Icon"> <i class="bi bi-box-arrow-right p-1"></i>  Logout </span>  </NavLink>
                    </li>

                </ul>
            </div>         
        </nav>
        <div className="container">
            <div className="row py-5 apnd">
                <h1 className="text-center py-2"> DONORS DETAIL</h1>
                <ul class="list-group list-group-horizontal p-0 ">
                    <li class="list-group-item col bg-info">First Name</li>
                    <li class="list-group-item col bg-info">Last Name</li>
                    <li class="list-group-item col bg-info">Blood Group</li>
                    <li class="list-group-item col bg-info"> Username</li>
                    <li class="list-group-item col bg-info">Phone Number</li>
                    <li class="list-group-item col bg-info">City</li>
                    <li class="list-group-item col bg-info">State</li>

                </ul>
            </div>
            <div className="row py-5 apndd">
                <h1 className="text-center py-2"> PATIENTS DETAIL</h1>
                <ul class="list-group list-group-horizontal p-0 ">
                    <li class="list-group-item col bg-info">First Name</li>
                    <li class="list-group-item col bg-info">Last Name</li>
                    <li class="list-group-item col bg-info">Blood Group</li>
                    <li class="list-group-item col bg-info"> Username</li>
                    <li class="list-group-item col bg-info">Phone Number</li>
                    <li class="list-group-item col bg-info">City</li>
                    <li class="list-group-item col bg-info">State</li>

                </ul>
            </div>
        </div>
        <div className="row text-center bg-dark text-white py-3">
                <h2> Blood Bank Management System </h2>
        </div>
        </div>
    </>)
}

export default AdminSubscriber;