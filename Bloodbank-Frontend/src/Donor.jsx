import React from "react";
//import Login from "./Login";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";
import {API} from "./backend";

const ReqData1 = async () => {
    try {
        var a1 = document.querySelector("#Duser1").value;
        var a2 = document.querySelector("#Dpasword1").value;
        if (a1 !== "" && a2 !== "") {
            const res = await fetch(`${API}donor_login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: a1,
                    password: a2
                })
            });
            document.querySelector("#pform1").reset();
            const fdata = await res.json();
            if (fdata.status) {
                // document.cookie = `username=${a1};`;
                sessionStorage.setItem("username", a1);
                window.location.href = "/donor/donorDashboard";
            } else {
                alert("Please enter the credentials correctly");
            }

        } else {
            alert("Fill All The Details");
        }

    } catch (error) {
        console.log(error);
    }
}




const ReqData2 = async () => {
    try {
        var a1 = document.querySelector("#Duser2").value;
        var a2 = document.querySelector("#Duserlast").value;
        var a3 = document.querySelector("#Dage").value;
        var a4 = document.querySelector("#Dblood").value;
        var a5 = document.querySelector("#Ddisease").value;
        var a6 = document.querySelector("#Dusername").value;
        var a7 = document.querySelector("#Duserpassword").value;
        var a8 = document.querySelector("#Daddress").value;
        var a9 = document.querySelector("#Dcity").value;
        var a10 = document.querySelector("#Dstate").value;
        var a11 = document.querySelector("#Dcode").value;
        var a12 = document.querySelector("#Dnumber").value;

        console.log(10)
        if (a1 !== "" && a2 !== "" && a3 !== "" && a4 !== "" && a5 !== "" && a6 !== "" && a7 !== "" && a8 !== "" && a9 !== "" && a10 !== "" && a11 !== "" && a12 !== "") {
            const res = await fetch(`${API}donor_register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname: a1,
                    lname: a2,
                    age: a3,
                    bgroup: a4,
                    disease: a5,
                    username: a6,
                    password: a7,
                    address: a8,
                    city: a9,
                    state: a10,
                    pin: a11,
                    phone: a12,

                })
            });
            document.querySelector("#pform2").reset();
            document.querySelector("#gokus").classList.toggle("d-none");
            const fdata = await res.json();
            if (fdata.status) {
                setTimeout(() => {
                    window.location.href = "/donor/login";
                    document.querySelector("#gokus").classList.toggle("d-none");
                }, 1000)
            } else {
                alert("Please Enter The credentials correctly");
            }

        } else {
            alert("Fill All The Details");
        }

    } catch (error) {
        console.log(error);
    }
}







const forms = () => {
    document.querySelectorAll(".form1")[0].classList.toggle("d-none");
    document.querySelectorAll(".form2")[0].classList.toggle("d-none");
}




const Donor_login = () => {
    const { t, i18n } = useTranslation();
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    return (
        <>
            <Navbar />
            <div className="container bg-ligh mt-5 back">
                <div className="row d-flex justify-content-center align-items-center height bg-light">
                    <div className="col-6 form1">
                        <h2 className="text-center mb-5 py-2 rounded bg-danger text-white"> {t("donor")} {t("login")}</h2>

                        <form className="form1" id="pform1">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> <h4> {t("user")} {t("name")} </h4> </label>
                                <input type="email" class="form-control" id="Duser1" aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text"> <h6> We'll never share your email with anyone else. </h6> </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label"> <h4> {t("password")}  </h4> </label>
                                <input type="password" class="form-control" id="Dpasword1" />
                            </div>
                            <span className="">
                                <div className="mb-3">
                                    <label className="form-label"> <h6> Does not have an account ? <span className="create" onClick={forms}> Click here to register </span> </h6> </label>
                                </div>
                            </span>
                            <div className="btn btn-dark" onClick={ReqData1}>{t("submit")}</div>
                        </form>

                    </div>
                    <div className="col-8 form2 d-none py-5">
                    
                        <form className="row g-3" id="pform2">
                            <div className="alert alert-primary d-none" role="alert" id="gokus">
                                Registration successful
                            </div>
                            <div className="col-md-6">
                                <label for="inputEmail4" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="Duser2" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputemail4" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="Duserlast" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputState" class="form-label">Blood Group</label>
                                <select id="Dblood" class="form-select">
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
                                <label for="inputEmail4" class="form-label">Disease</label>
                                <input type="email" class="form-control" id="Ddisease" placeholder="If Yes, Write Disease Name" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputEmail4" class="form-label">User Name</label>
                                <input type="email" class="form-control" id="Dusername" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputPassword4" class="form-label">Password</label>
                                <input type="password" class="form-control" id="Duserpassword" />
                            </div>
                            <div className="col-6">
                                <label for="inputAddress" class="form-label">Address</label>
                                <input type="text" class="form-control" id="Daddress" />
                            </div>
                            <div className="col-6">
                                <label for="inputAddress2" class="form-label">Phone / Mobile no :-</label>
                                <input type="number" class="form-control" id="Dnumber" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputCity" class="form-label">Age</label>
                                <input type="number" class="form-control" id="Dage" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputCity" class="form-label">City</label>
                                <input type="text" class="form-control" id="Dcity" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputState" class="form-label">State</label>
                                <input type="text" class="form-control" id="Dstate" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputZip" class="form-label">Pin Code</label>
                                <input type="text" class="form-control" id="Dcode" />
                            </div>
                            <label className="form-label"> <h6> Already have an account ? <span className="create" onClick={forms}> Click here to Login </span> </h6> </label>
                            <div className="col-12">
                                <div class="btn btn-dark" onClick={ReqData2}>Sign in</div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            <br></br>
            <div className="row text-center bg-dark text-white py-3">
                <h2> {t("blood")} {t("bank")} {t("management")} {t("system")}</h2>
            </div>
        </>)
}

export default Donor_login;


