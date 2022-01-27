import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { API } from "./backend";

const GetData1 = async () => {
    const res = await fetch(`${API}admin_get_all_requests`)
    const FinalData = await res.json();
    console.log(FinalData.data);
    var reqmad = document.querySelectorAll(".apnd");
    for (var a = 0; a < FinalData.data.length; a++) {
        reqmad[0].insertAdjacentHTML("beforeend", `
         <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">${FinalData.data[a].name}</li>
                    <li class="list-group-item col">${FinalData.data[a].age}</li>
                    <li class="list-group-item col">${FinalData.data[a].bgroup}</li>
                    <li class="list-group-item col">${FinalData.data[a].reason}</li>
                    <li class="list-group-item col">${FinalData.data[a].unit}</li>
                    <li class="list-group-item col">${timeConverter(FinalData.data[a].date)}</li>
                    <li class="list-group-item col">${FinalData.data[a].status}</li>
                    <li class="list-group-item col-2"> ${CheckStatus(FinalData.data[a].status, FinalData.data[a].request_id)}  <button class="btn border-primary m-1" id="approved_${FinalData.data[a].request_id}">Approve</button> <button class="btn m-1 border-danger" id="rejected_${FinalData.data[a].request_id}">Reject</button> </li>
                </ul >
    `)
        document.querySelector(`#approved_${FinalData.data[a].request_id} `).addEventListener('click', (e) => {
            console.log(e.explicitOriginalTarget.id)
            var a = e.explicitOriginalTarget.id.split("_");
            console.log(a);
            StatusChange(a[0], a[1]);

        })
        document.querySelector(`#rejected_${FinalData.data[a].request_id} `).addEventListener('click', (e) => {
            console.log(e.explicitOriginalTarget.id)
            var a = e.explicitOriginalTarget.id.split("_");
            console.log(a);
            StatusChange(a[0], a[1])
        })
    }

}


function CheckStatus(a, b) {
    if (a === "pending") {
        return "";
    }
    var x = `#approved_` + b
    var y = `#rejected_` + b
    if (a === "approved") {
        setTimeout(() => {
            let v = document.querySelector(x).classList.add("d-none");
            console.log(v)
        }, 500)
    } else {
        setTimeout(() => {
            let v = document.querySelector(y).classList.add("d-none");
            console.log(v)
        }, 500)
    }
    return ""
}

//  <div class = "row py-5 apnd">

//  </div >
async function StatusChange(status, id) {
    var reqmad = document.querySelectorAll(".apnd");
    reqmad[0].innerHTML = `
          
                <h3 class="text-center py-2"> BLOOD REQUEST </h3>
                <ul class="list-group list-group-horizontal p-0 ">
                    <li class="list-group-item col bg-info"> Patient Name</li>
                    <li class="list-group-item col bg-info">Age</li>
                    <li class="list-group-item col bg-info">Blood Group</li>
                    <li class="list-group-item col bg-info">Reason</li>
                    <li class="list-group-item col bg-info">Unit (in ml)</li>
                    <li class="list-group-item col bg-info">Date</li>
                    <li class="list-group-item col bg-info">Status</li>
                    <li class="list-group-item col bg-info">Action</li>

                </ul>
            
    `;
    const res = await fetch(`${API}change_request_status`, {
        method: "POST",
        body: JSON.stringify({
            status: status,
            request_id: id
        })
    })
    const FinalData = await res.json()
    console.log(FinalData);
    GetData1();
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


function backs() {
    window.history.back();
}



const AdminRequest = () => {

    useState(() => {
        GetData1();
    })



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
                    </li>                      */}
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
        <div className="container">
            <div className="row py-5 apnd">
                <h3 className="text-center py-2"> BLOOD REQUEST </h3>
                <ul class="list-group list-group-horizontal p-0 ">
                    <li class="list-group-item col bg-info">Name/Email Id</li>
                    <li class="list-group-item col bg-info">Aadhar Card Number</li>
                    <li class="list-group-item col bg-info">Blood Group</li>
                    <li class="list-group-item col bg-info"> Reason</li>
                    <li class="list-group-item col bg-info">Unit (in ml)</li>
                    <li class="list-group-item col bg-info">Date</li>
                    <li class="list-group-item col bg-info">Status</li>
                    <li class="list-group-item col bg-info">Action</li>

                </ul>
                {/* <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">Ram</li>
                    <li class="list-group-item col">50</li>
                    <li class="list-group-item col">Death</li>
                    <li class="list-group-item col">B+</li>
                    <li class="list-group-item col">500</li>
                    <li class="list-group-item col">20/10/21</li>
                    <li class="list-group-item col"></li>
                    <li class="list-group-item col">Pending</li>
                    <li class="list-group-item col"><span className="edit">Approve</span> <span className="delete">Reject</span> </li>
                </ul> */}
            </div>
        </div>
    </>)
}

export default AdminRequest;