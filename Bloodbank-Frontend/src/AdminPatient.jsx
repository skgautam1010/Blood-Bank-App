import React from "react";
import { NavLink } from "react-router-dom";
const AdminPatient = () => {
    return (<>
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
                    </li>                     */}
                    <li className="nav-item mx-1">
                        <NavLink className="nav-link" to="/admin/request"> <span className="Icon"><i class="bi bi-hand-index-thumb-fill p-1"></i> Request </span>  </NavLink>
                    </li>
                    <li className="nav-itemmx-1">
                        <NavLink className="nav-link" to="/admin/history">  <span className="Icon"> <i class="bi bi-hourglass-split p-1"></i>  History </span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="lang">  <span className="Icon"> <i class="bi bi-box-arrow-right p-1"></i>  Logout </span>  </NavLink>
                    </li>

                </ul>
            </div>         </nav>
        <div className="container">
            <div className="row py-5">
                <h3 className="text-center py-2"> PATIENT DETAILS </h3>
                <ul class="list-group list-group-horizontal p-0 ">
                    <li class="list-group-item col bg-info"> Name</li>
                    <li class="list-group-item col bg-info">Blood Group</li>
                    <li class="list-group-item col bg-info">Age</li>
                    <li class="list-group-item col bg-info">Disease</li>
                    <li class="list-group-item col bg-info">Mobile</li>
                    <li class="list-group-item col bg-info">Action</li>
                </ul>
                <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">Ram</li>
                    <li class="list-group-item col">B-</li>
                    <li class="list-group-item col">25</li>
                    <li class="list-group-item col">HIV</li>
                    <li class="list-group-item col">9818420000</li>
                    <li class="list-group-item col"><span className="edit">Edit</span> <span className="delete">Delete</span> </li>
                </ul>
            </div>
        </div>

    </>)
}

export default AdminPatient;