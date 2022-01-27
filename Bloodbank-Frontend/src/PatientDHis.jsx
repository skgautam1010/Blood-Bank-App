import React from "react";

const PatientDHis = () => {
    return (<>

        <div className="container">
            <div className="row py-5">
                <h3 className="text-center py-2"> My Blood Request </h3>
                <ul class="list-group list-group-horizontal p-0 ">
                    <li class="list-group-item col bg-info"> Name</li>
                    <li class="list-group-item col bg-info"> Age</li>
                    <li class="list-group-item col bg-info">Reason</li>
                    <li class="list-group-item col bg-info">Blood Group</li>
                    <li class="list-group-item col bg-info">Unit</li>
                    <li class="list-group-item col bg-info">Date</li>
                    <li class="list-group-item col bg-info">Status</li>
                </ul>
                <ul class="list-group list-group-horizontal p-0">
                    <li class="list-group-item col">Ram</li>
                    <li class="list-group-item col">18y</li>
                    <li class="list-group-item col">Death</li>
                    <li class="list-group-item col">AB-</li>
                    <li class="list-group-item col">20ml</li>
                    <li class="list-group-item col">20/10/21</li>
                    <li class="list-group-item col"> <span className="status"> Pending </span> </li>
                </ul>
            </div>
        </div></>)
}

export default PatientDHis;