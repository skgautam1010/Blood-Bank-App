import React from "react";
import { NavLink } from "react-router-dom";

const Login = (props) => {
    console.log(props)
    const forms = () => {
        document.querySelectorAll(".form1")[0].classList.toggle("d-none");
        document.querySelectorAll(".form2")[0].classList.toggle("d-none");
    }

    return (
        <>
            <div className="container bg-ligh mt-5 back">
                <div className="row d-flex justify-content-center align-items-center height bg-light">
                    <div className="col-6 form1">
                        <h2 className="text-center mb-5 py-2 rounded bg-danger text-white"> {props.users}</h2>

                        <form className="form1">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> <h4> User Name </h4> </label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text"> <h6> We'll never share your email with anyone else. </h6> </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label"> <h4> Password  </h4> </label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                            </div>
                            <span className={props.display}>
                                <div className="mb-3">
                                    <label className="form-label"> <h6> Does not have an account ? <span className="create" onClick={forms}> Click here to register </span> </h6> </label>
                                </div>
                            </span>
                            {/* <button type="submit" className="btn btn-dark" onClick={funk1}>Submit</button> */}
                            <NavLink className="btn btn-dark" to={props.Links}> Submit</NavLink>
                        </form>

                    </div>
                    <div className="col-8 form2 d-none py-5">

                        <form className="row g-3">
                            <div className="col-md-6">
                                <label for="inputEmail4" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="inputEmail4" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputemail4" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="inputemail4" />
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
                                <label for="inputEmail4" class="form-label">Disease</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder={props.ill} />
                            </div>
                            <div className="col-md-6">
                                <label for="inputEmail4" class="form-label">User Name</label>
                                <input type="email" class="form-control" id="inputEmail4" />
                            </div>
                            <div className="col-md-6">
                                <label for="inputPassword4" class="form-label">Password</label>
                                <input type="text" class="form-control" id="inputPassword4" />
                            </div>
                            <div className="col-6">
                                <label for="inputAddress" class="form-label">Address</label>
                                <input type="text" class="form-control" id="inputAddress" />
                            </div>
                            <div className="col-6">
                                <label for="inputAddress2" class="form-label">Phone / Mobile no :-</label>
                                <input type="number" class="form-control" id="inputAddress2" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputCity" class="form-label">Age</label>
                                <input type="number" class="form-control" id="inputCity" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputCity" class="form-label">City</label>
                                <input type="text" class="form-control" id="inputCity" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputState" class="form-label">State</label>
                                <input type="text" class="form-control" id="inputCity" />
                            </div>
                            <div className="col-md-3">
                                <label for="inputZip" class="form-label">Pin Code</label>
                                <input type="text" class="form-control" id="inputZip" />
                            </div>
                            <label className="form-label"> <h6> Already have an account ? <span className="create" onClick={forms}> Click here to Login </span> </h6> </label>
                            <div className="col-12">
                                {/* <button type="submit" class="btn btn-dark">Sign in</button> */}
                                <NavLink className="btn btn-dark" to={props.Links}>  {props.Links}Sign In</NavLink>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;