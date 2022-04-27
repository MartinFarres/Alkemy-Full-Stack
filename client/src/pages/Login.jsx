import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import "../assets/css/Home.css";
import useAuth from "../hooks/useAuth";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Home";

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/users/login",
                JSON.stringify({
                    user: user,
                    password: pwd,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const id = response?.data?.id;
            const accessToken = response?.data?.accessToken;

            setAuth({ id, user, pwd, accessToken });

            setUser("");
            setPwd("");
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <h4 className="block-title">Login</h4>
            <label htmlFor="user" className="block-title2">
                Username:
            </label>
            <div className="b-white mx-2">
                <input
                    type="text"
                    id="user"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                    value={user}
                    required
                    className="input-blocks"
                />
            </div>
            <label htmlFor="password" className="block-title2 mt-3">
                Password:
            </label>
            <div className="b-white mx-2">
                <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                        setPwd(e.target.value);
                    }}
                    value={pwd}
                    required
                    className="input-blocks"
                />
            </div>
            <div className="mx-2 mt-3">
                <button className="add_button add_text">Login</button>
            </div>
            <p className="block-title3 mt-2">Need an Account?</p>
            <Link to={"/Register"} className="block-title3 a3 mb-3">
                Sign Up
            </Link>
        </form>
    );
}

export default Login;
