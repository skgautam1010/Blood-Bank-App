import React from "react";


const AdminHP = () => {
    return (<>
        <div className="container mt-2">
            <div className="row g-3 py-4">
                <div className="col-3">
                    <div className="card p-2">
                        <h1 className="card-title">  <i class="bi bi-droplet-fill req"></i> A+ <span className="numb"> 10</span> </h1>
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
                        <h1 className="card-title"><i class="bi bi-droplet-fill req"></i> B+ <span className="numb"> 20</span> </h1>
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
                <h2 className="text-center">Update Blood Unit</h2>
                <form class="row g-3 d-flex justify-content-center">
                    <div class="col-md-3">
                        <select id="inputState" class="form-select">
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
                        <input type="number" class="form-control" id="inputZip" placeholder="Unit" />
                    </div>
                    <div className="col-1">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

export default AdminHP;