import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//import AdminHP from "./AdminHP";
import {API} from "./backend";

const ReqData1 = async () => {
    try {
        const res = await fetch(`${API}admin_dashboard`, {
            // method: "GET",
        });
        const fdata = await res.json();
        if (fdata.status === true) {
            console.log(fdata.data);
            var numb = document.querySelectorAll(".numb");
            numb[0].innerText = fdata.data.blood.AP
            numb[1].innerText = fdata.data.blood.BP
            numb[2].innerText = fdata.data.blood.OP
            numb[3].innerText = fdata.data.blood.ABP
            numb[4].innerText = fdata.data.blood.AN
            numb[5].innerText = fdata.data.blood.BN
            numb[6].innerText = fdata.data.blood.ON
            numb[7].innerText = fdata.data.blood.ABN

            var numbe = document.querySelectorAll(".numbe");
            numbe[0].innerText = fdata.data.total_donors
            numbe[1].innerText = fdata.data.total_requests
            numbe[2].innerText = fdata.data.approved_requests
            numbe[3].innerText = fdata.data.total_blood_unit






        } else {
            console.log(fdata.status)
        }
    } catch (error) {
        console.log(error);
    }
}



const ReqData2 = async () => {
    try {
        var a1 = document.querySelector("#Uinput1").value;
        var a2 = document.querySelector("#Uinput2").value;
        const res = await fetch(`${API}update_blood_bank`, {
            method: "POST",
            body: JSON.stringify({
                bgroup: a1,
                unit: a2,
                increment:true
            })
        });
        const fdata = await res.json();
        bloodadd()
        ReqData1()
        console.log(fdata)
    } catch (error) {
        console.log(error);
    }
}

const ReqData3 = async () => {
    try {
        var a1 = document.querySelector("#Uinput11").value;
        var a2 = document.querySelector("#Uinput22").value;
        const res = await fetch(`${API}update_blood_bank`, {
            method: "POST",
            body: JSON.stringify({
                bgroup: a1,
                unit: a2,
                increment:false
            })
        });
        const fdata = await res.json();
        bloodadd()
        ReqData1()
        console.log(fdata)
    } catch (error) {
        console.log(error);
    }
}


function backs() {
    window.history.back();
}

function bloodadd() {
    document.querySelector("#bloodadd").classList.toggle("d-none");
    setTimeout(() => {
        document.querySelector("#bloodadd").classList.toggle("d-none");
    }, 1000)
}



const Admin_dashboard = () => {

    useState(() => {
        ReqData1();
    }, [])


    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container-fluid position-relative">
                <NavLink className="navbar-brand" to="/"> <h4> <i class="bi bi-heart-fill"></i>  <span className="head">Blood Bank Management System</span> </h4> </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll nav1">
                    {/* <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/admin/donor"> <span className="Icon"> <i class="bi bi-people-fill p-1"></i> Donor </span>  </NavLink>
                    </li>
                    <li className="nav-item mx-1">                         <NavLink className="nav-link" to="/admin/patient"> <span className="Icon"> <i class="bi bi-activity p-1"></i> Patient </span>  </NavLink>
                    </li> */}
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
            </div>         </nav>
        <span className="title">Admin Dashboard</ span>





        {/* <AdminHP /> */}

        <div className="container mt-2">
            <div className="row g-3 py-4">
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title">  <i class="bi bi-droplet-fill req"></i> A+ <span className="numb"> </span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title"><i class="bi bi-droplet-fill req"></i> B+ <span className="numb"> 10</span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title">  <i class="bi bi-droplet-fill req"></i> O+ <span className="numb"> 50</span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title"><i class="bi bi-droplet-fill req"></i> AB+ <span className="numb"> 20</span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title"> <i class="bi bi-droplet-fill req"></i> A- <span className="numb"> 500</span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title"> <i class="bi bi-droplet-fill req"></i> B- <span className="numb"> 54</span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title"> <i class="bi bi-droplet-fill req"></i> O- <span className="numb"> 78</span> </h1>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title"> <i class="bi bi-droplet-fill req"></i> AB- <span className="numb"> 90</span> </h1>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row g-3 my-4">
                <div className="col-3">
                    <div className="card p-2">
                        <h6 className="card-title">  <i class="bi bi-people-fill dons text-info"></i> Total Donors <span className="numbe"> 10</span> </h6>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h6 className="card-title"><i class="bi bi-plus-lg dons text-info"></i>Total Requests <span className="numbe"> 10</span> </h6>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h6 className="card-title"><i class="bi bi-check-circle-fill dons text-info"></i> Approved Requests <span className="numbe"> 10</span> </h6>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card p-2">
                        <h6 className="card-title"><i class="bi bi-droplet-half dons text-info"></i>Total Blood Unit (ml) <span className="numbe"> 10</span> </h6>
                    </div>
                </div>

            </div>
            <hr />
            <div className="row g-3 my-4">
                <div class="alert alert-success d-none" role="alert" id="bloodadd">
                    Stock Updated Succesfully
                </div>
                <h2 className="text-center">Update Blood Unit</h2>
                <form class="row g-3 d-flex justify-content-center">
                    <div class="col-md-3">
                        <select id="Uinput1" class="form-select">
                            <option>O+</option>
                            <option>O-</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB-</option>
                            <option>AB+</option>
                            <option selected>Choose Blood Group</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="number" class="form-control" id="Uinput2" placeholder="Unit" />
                    </div>
                    <div className="col-1">
                        <div class="btn btn-primary " onClick={ReqData2}>Update</div>
                    </div>
                </form>
            </div>
            <div className="row g-3 my-4">
                <div class="alert alert-success d-none" role="alert" id="bloodadd">
                    Stock Removed Succesfully
                </div>
                <form class="row g-3 d-flex justify-content-center">
                    <div class="col-md-3">
                        <select id="Uinput11" class="form-select">
                            <option>O+</option>
                            <option>O-</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB-</option>
                            <option>AB+</option>
                            <option selected>Choose Blood Group</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="number" class="form-control" id="Uinput22" placeholder="Unit" />
                    </div>
                    <div className="col-1">
                        <div class="btn btn-primary" onClick={ReqData3}>Remove</div>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

export default Admin_dashboard;