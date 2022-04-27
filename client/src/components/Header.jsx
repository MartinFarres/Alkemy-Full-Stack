import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Header.css";
import DropMenu from "./DropMenu";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";

const Header = () => {
    const { auth } = useAuth();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate("/Login");
    };
    const path = useLocation();
    useEffect(() => {
        const activeNav = document.querySelector(".nav_a.active");
        if (activeNav) {
            activeNav.classList.remove("active");
        }
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
                    <Link to={"/Home"} className="nav_a active">
                        Home
                    </Link>
                    <Link to={"/List"} className="nav_a">
                        List
                    </Link>
                    {auth?.user ? (
                        <>
                            <Link to={"/Additem"} className="nav_a">
                                Add Item
                            </Link>
                            <div onClick={logout} className="nav_a">
                                Logout
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to={"/Register"} className="nav_a">
                                Register
                            </Link>
                            <Link to={"/Login"} className="nav_a">
                                Login
                            </Link>
                        </>
                    )}
                </div>
                <div className="nav_right ">
                    <DropMenu></DropMenu>
                </div>
            </div>
        </div>
    );
};

export default Header;
