import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18n from "./i18n";

const Navbar = () => {

    function langu1() {
        console.log("Gourav1");
        i18n.changeLanguage("hin")
    }

    function langu2() {
        console.log("Gourav2");
        i18n.changeLanguage("pt")
    }

    function langu3() {
        console.log("Gourav2");
        i18n.changeLanguage("en")
    }

    const { t, i18n } = useTranslation()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <div className="container-fluid position-relative">
                    <NavLink className="navbar-brand" to="/"> <h4> <i class="bi bi-heart-fill"></i>  <span className="head"> {t("title")} </span> </h4> </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll nav1">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/home"> <span className="Icon"> <i class="bi bi-house-door-fill p-1"> </i> {t("home")} </span>  </NavLink>
                        </li>
                        <li className="nav-item mx-1">
                            <NavLink className="nav-link" to="/patient/login"> <span className="Icon"> <i class="bi bi-activity p-1"></i>  {t("patient")} </span>  </NavLink>
                        </li>
                        <li className="nav-item mx-1">
                            <NavLink className="nav-link" to="/donor/login"> <span className="Icon"> <i class="bi bi-people-fill p-1"></i> {t("donor")} </span>  </NavLink>
                        </li>
                        {/*<li className="nav-itemmx-1">
                            <NavLink className="nav-link" to="/admin/login">  <span className="Icon"> <i class="bi bi-person-fill p-1"></i>  {t("admin")} </span>  </NavLink>
                        </li>*/}
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="lang" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">  <span className="Icon"> <i class="bi bi-translate p-1"></i>  {t("language")} </span>  </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li class="dropdown-item"> <span className="lang" onClick={langu3}> English </span> </li>
                                <li class="dropdown-item"> <span className="lang" onClick={langu1}> Hindi </span> </li>
                                <li class="dropdown-item"> <span className="lang" onClick={langu2}> (ಕನ್ನಡ) </span> </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    );
}

export default Navbar;