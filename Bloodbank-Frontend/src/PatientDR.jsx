import React from "react";

const PatientDR = () => {
    return (
        <>
            <div className="container bg-ligh mt-5 back">
                <div className="row d-flex justify-content-center align-items-center height bg-light">
                    <div className="col-8 form2 py-5">
                        <h2 className="text-center mb-5 py-2 rounded bg-danger text-white">  BLOOD REQUEST </h2>
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label for="inputEmail4" class="form-label"> Name</label>
                                <input type="email" class="form-control" id="inputEmail4" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputPassword4" class="form-label"> Age</label>
                                <input type="number" class="form-control" id="inputAge" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputState" class="form-label">Blood Group</label>
                                <select id="inputState" class="form-select">
                                    <option selected>A+</option>
                                    <option selected>B+</option>
                                    <option selected>AB+</option>
                                    <option selected>O+</option>
                                    <option selected>A-</option>
                                    <option selected>B-</option>
                                    <option selected>AB-</option>
                                    <option selected>O-</option>
                                    <option selected>Choose..</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label for="inputReason" class="form-label">Reason</label>
                                <input type="text" class="form-control" id="inputEmail4" />
                            </div>
                            <div className="col-md-12">
                                <label for="inputUnit" class="form-label">Unit (ml)</label>
                                <input type="number" class="form-control" id="inputUnit" />
                            </div>

                            <div className="col-12">
                                <button type="submit" class="btn btn-danger">Request</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientDR;