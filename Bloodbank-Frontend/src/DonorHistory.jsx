import React, { useState } from "react";
import PatientDHis from "./PatientDHis";
import { NavLink } from "react-router-dom";





const GetData1 = async () => {
    // var cc = document.cookie.split("=")[1];
    var cc = sessionStorage.getItem("username");
    console.log(cc)
    const res = await fetch("http://localhost:8000/donor_request_history", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: cc })
    });
    const FinalData = await res.json();
    console.log(FinalData.data);
    var reqmad = document.querySelectorAll(".apnd");
    for (var a = 0; a < FinalData.data.full_data.length; a++) {
        reqmad[0].insertAdjacentHTML("beforeend", `
         <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">${FinalData.data.full_data[a][1]}</li>
                    <li class="list-group-item col">${FinalData.data.full_data[a][2]} </li>
                    <li class="list-group-item col">${FinalData.data.full_data[a][4]}</li>
                    <li class="list-group-item col">${FinalData.data.full_data[a][3]}</li>
                    <li class="list-group-item col">${FinalData.data.full_data[a][5]}ml</li>
                    <li class="list-group-item col">${timeConverter(FinalData.data.full_data[a][6])}</li>
                    <li class="list-group-item col"> <span class="status"> ${FinalData.data.full_data[a][7]} </span> </li>
                </ul>
        `)
    }

}




function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    return time;
}


function logout() {
    // document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}




function backs() {
    window.history.back();
}
const DonorHistory = () => {

    useState(() => {
        GetData1();
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
                        <NavLink className="nav-link" aria-current="page" to="/donor/donorRequest" > <span className="Icon"> <i class="bi bi-hand-index-thumb-fill p-1"></i>  Request </span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/donor/donorHistory"> <span className="Icon">  <i class="bi bi-hourglass-split p-1"></i> History </span>  </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/" onClick={logout}> <span className="Icon"> Logout  <i class="bi bi-box-arrow-right p-1"></i> </span>  </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        {/* <PatientDHis /> */}

        <div className="container">
            <div className="row py-5 apnd">
                <h3 className="text-center py-2"> My Blood Request </h3>
                <ul className="list-group list-group-horizontal p-0 ">
                    <li className="list-group-item col bg-info"> Email</li>
                    <li className="list-group-item col bg-info"> Aadhar Card Number</li>
                    <li className="list-group-item col bg-info">Reason</li>
                    <li className="list-group-item col bg-info">Blood Group</li>
                    <li className="list-group-item col bg-info">Unit</li>
                    <li className="list-group-item col bg-info">Date</li>
                    <li className="list-group-item col bg-info">Status</li>
                </ul>
                {/* <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">Ram</li>
                    <li class="list-group-item col">18y</li>
                    <li class="list-group-item col">Death</li>
                    <li class="list-group-item col">AB-</li>
                    <li class="list-group-item col">20ml</li>
                    <li class="list-group-item col">20/10/21</li>
                    <li class="list-group-item col"> <span className="status"> Pending </span> </li>
                </ul> */}
            </div>
        </div>
    </>)
}

export default DonorHistory;