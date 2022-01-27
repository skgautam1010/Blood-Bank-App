import React from "react";
import Navbar from "./Navbar";
import { useTranslation } from "react-i18next";
import {API} from "./backend";

const ReqData1 = async () => {
    
    try {
        var a1 = document.querySelector("#Auser1").value;
        var a2 = document.querySelector("#Apasword1").value;
        if (a1 !== "" && a2 !== "") {
            const res = await fetch(`${API}admin_login`, {
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
                window.location.href = "/admin/dashboard";
            } else {
                alert("Please enter the correct username and password");
            }

        } else {
            alert("Fill All The Details");
        }

    } catch (error) {
        console.log(error);
    }
}


const Admin_login = () => {
    const { t, i18n } = useTranslation();
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    return (
        <>
        <div className="overflow-hidden">
            <Navbar />
            <div className="container bg-ligh mt-5 back">
                <div className="row d-flex justify-content-center align-items-center height bg-light">
                    <div className="col-6 form1">
                        <h2 className="text-center mb-5 py-2 rounded bg-danger text-white"> {t("admin")} {t("login")}</h2>

                        <form className="form1" id="pform1">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"> <h4> {t("user")} {t("name")} </h4> </label>
                                <input type="email" class="form-control" id="Auser1" aria-describedby="emailHelp" />
                                <div id="emailHelp" class="form-text"> <h6> We'll never share your email with anyone else. </h6> </div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label"> <h4> {t("password")}  </h4> </label>
                                <input type="password" class="form-control" id="Apasword1" />
                            </div>
                            <div className="btn btn-dark" onClick={ReqData1}>{t("submit")}</div>
                        </form>

                    </div>
                </div>
            </div>
            <br></br>
            <div className="row text-center bg-dark text-white py-3">
                <h2> {t("blood")} {t("bank")} {t("management")} {t("system")}</h2>
            </div>
        </div>
        </>)
}

export default Admin_login;


