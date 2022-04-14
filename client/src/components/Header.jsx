import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Header.css";
import DropMenu from "./DropMenu";

const Header = () => {
    const path = useLocation();
    useEffect(() => {
        document.querySelector(".nav_a.active").classList.remove("active");
        let links = document.querySelectorAll(".nav_a");
        for (let i = 0; i < 4; i++) {
            if (links[i].getAttribute("href") === path.pathname) {
                links[i].classList.add("active");
            }
        }
    }, [path]);
    return (
        <div className="header_wrapper">
            <div className="Header_frame">
                <img
                    src={require("../assets/images/logo-money.png")}
                    alt="Logo"
                    className="Logo"
                />
                <div className="nav_chart nav_chart_mobile">
                    <Link to={"/"} className="nav_a active">
                        Home
                    </Link>
                    <Link to={"/Login"} className="nav_a">
                        Login
                    </Link>
                    <Link to={"/Register"} className="nav_a">
                        Register
                    </Link>
                    <Link to={"/List"} className="nav_a">
                        List
                    </Link>
                </div>
                <div className="nav_right ">
                    <DropMenu></DropMenu>
                </div>
            </div>
        </div>
    );
};

export default Header;
