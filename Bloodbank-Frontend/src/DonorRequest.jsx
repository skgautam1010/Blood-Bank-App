import React,{useState} from "react";
//import PatientDR from "./PatientDR";
import { NavLink } from "react-router-dom";
import validator from 'validator'
import emailjs from 'emailjs-com'


const ReqData = async () => {
    try {
        var a1 = document.querySelector("#PRname").value;
        var a2 = document.querySelector("#PRage").value;
        var a3 = document.querySelector("#PRblood").value;
        var a4 = document.querySelector("#PRreason").value;
        var a5 = document.querySelector("#PRunit").value;
        console.log(10)
        // var cc = document.cookie.split("=")[1];
        var cc = sessionStorage.getItem("username");
        if (a1 !== "" && a2 !== "" && a3 !== "" && a4 !== "" && a5 !== "") {
            const res = await fetch("http://localhost:8000/donor_blood_request", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: cc,
                    name: a1,
                    age: a2,
                    bgroup: a3,
                    reason: a4,
                    unit: a5
                })
            });
            const fdata = await res.json();
            console.log(fdata);
            document.querySelector("#PRform").reset();
            if (fdata.status) {
                alert("Successful Submission the request for Donation")
            } else {
                alert("Already Made The request Try Again to donate after 3 months");
            }

        } else {
            alert("Fill The Form");
        }

    } catch (error) {
        console.log(error);
    }
}


function logout() {
    // document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}




function backs() {
    window.history.back();
}

const DonorRequest = () => {
  const [emailError, setEmailError] = useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Email Validated :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }
  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_r832lbd', 'template_adgj0gc', e.target, 'user_D7cA6rkU1qmaFDkAboC2z')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
          });
    };
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
        {/* <PatientDR /> */}

        <div className="container bg-ligh mt-5 back">
            <div className="row d-flex justify-content-center align-items-center height bg-light">
                <div className="col-8 form2 py-5">
                    <h2 className="text-center mb-5 py-2 rounded bg-danger text-white">  DONOR BLOOD DONATION REQUEST FORM </h2>
                    <form className="row g-3" id="PRform" onSubmit={sendEmail}>
                        <div className="col-md-6">
                            <label for="inputEmail4" class="form-label"> Email</label>
                            <input type="email" class="form-control" id="PRname" name="email_id" onChange={(e) => validateEmail(e)} />
                            <span style={{
                            fontWeight: 'bold',
                            color: 'blue',
                            }}>{emailError}</span>
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" class="form-label"> Aadhar Card Number</label>
                            <input type="number" class="form-control" id="PRage" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputState" class="form-label">Blood Group</label>
                            <select id="PRblood" class="form-select">
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
                            <input type="text" class="form-control" id="PRreason" />
                        </div>
                        <div className="col-md-12">
                            <label for="inputUnit" class="form-label">Unit (ml)</label>
                            <input type="number" class="form-control" id="PRunit" />
                        </div>

                        <div className="col-12">
                        <input type="submit" class="btn btn-danger" name="Submit" value="Request" onClick={ReqData} />
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </>)

}

export default DonorRequest;