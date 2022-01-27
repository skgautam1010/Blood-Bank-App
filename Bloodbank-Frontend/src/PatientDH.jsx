import React from "react";

const PatientDH = () => {
    return (<>
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

export default PatientDH;