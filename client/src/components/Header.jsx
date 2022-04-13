import React from "react";
import "./Header.css";
import DropMenu from "./DropMenu";

const Header = () => {
    return (
        <div className="Header">
            <div className="Header_frame">
                <img
                    src={require("../assets/images/logo-money.png")}
                    alt="Logo"
                    className="Logo"
                />
                <div className="nav_chart nav_chart_mobile">
                    <a href="/" className="nav_a active">
                        Home
                    </a>
                    <a href="/Login" className="nav_a">
                        Login
                    </a>
                    <a href="/Register" className="nav_a">
                        Register
                    </a>
                    <a href="/List" className="nav_a">
                        List
                    </a>
                </div>
                <div className="nav_right">
                    <DropMenu></DropMenu>
                </div>
            </div>
        </div>
    );
};

export default Header;
