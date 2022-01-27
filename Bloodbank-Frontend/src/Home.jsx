import React, { useState } from "react";
import Navbar from "./Navbar";
import I1 from "./image/img1.jpg"
import { useTranslation } from "react-i18next";
import {API} from "./backend";


const Home = () => {
    const { t, i18n } = useTranslation();
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    const ReqData = async () => {
        try {
            var a1 = document.querySelector("#Hname").value;
            var a2 = document.querySelector("#Hage").value;
            var a3 = document.querySelector("#Hblood").value;
            var a4 = document.querySelector("#Hreason").value;
            var a5 = document.querySelector("#Hunit").value;
            var a6 = document.querySelector("#Hnumber").value;
            console.log(10)
            if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && a5 != "" && a6 != "") {
                const res = await fetch(`${API}emergency_request`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: a1,
                        age: a2,
                        bgroup: a3,
                        reason: a4,
                        unit: a5,
                        phone: a6
                    })
                });
                const fdata = await res.json();
                if (fdata.status) {
                    document.querySelectorAll(".popup")[0].classList.toggle("d-none");
                    setTimeout(() => {
                        document.querySelectorAll(".popup")[0].classList.toggle("d-none");
                    }, 3000);
                    document.querySelector("#Hform").reset();
                } else {
                    alert("Something went wrong");
                }

            } else {
                document.querySelectorAll(".popup2")[0].classList.toggle("d-none");
                setTimeout(() => {
                    document.querySelectorAll(".popup2")[0].classList.toggle("d-none");
                }, 3000)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <Navbar />
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <img src={I1} class="img p-0" alt="blooddonation" />
            </div>

            <div className="row text-center bg-light py-3">
                <h4> " {t("quot")} "</h4>
                <h6> -{t("writer")}</h6>
            </div>

            <div className="row text-center bg-dark text-white py-3">
                <h2> {t("blood")} {t("bank")} {t("management")} {t("system")}</h2>
            </div>

            <form className="col-4 homeform px-3 bg-light rounded" id="Hform">
                <h4 className="text-center px-2 py-1">{t("ftitle")}</h4>
                <div className="popup d-none">
                    <div class="alert alert-success" role="alert">
                        Emergency Blood Request is submmited successfully
                    </div>
                </div>

                <div className="popup2 d-none">
                    <div class="alert alert-danger" role="alert">
                        Please fill all the details!
                    </div>
                </div>
                <div className="col-md-12">
                    <label for="inputEmail4" class="form-label px-2"> {t("fname")}</label>
                    <input type="text" class="form-control" id="Hname" required />
                </div>
                <div className="col-md-12">
                    <label for="inputPassword4" class="form-label px-2"> {t("fage")}</label>
                    <input type="number" class="form-control" id="Hage" required />
                </div>
                <div className="col-md-12">
                    <label for="inputState" class="form-label px-2">{t("fblood")}</label>
                    <select id="Hblood" class="form-select" required>
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
                <div className="col-md-12">
                    <label for="inputReason" class="form-label px-2">{t("freason")}</label>
                    <input type="text" class="form-control" id="Hreason" required />
                </div>
                <div className="col-md-12">
                    <label for="inputUnit" class="form-label px-2"> {t("funit")}</label>
                    <input type="number" class="form-control" id="Hunit" required />
                </div>
                <div className="col-md-12">
                    <label for="inputUnit" class="form-label px-2"> {t("fnumber")}</label>
                    <input type="number" class="form-control" id="Hnumber" required />
                </div>

                <div className="col-12 py-2">
                    <div class="btn btn-danger px-2" onClick={ReqData}>{t("freq")}</div>
                </div>
                

            </form>

        </div>
    </>)
}

export default Home;