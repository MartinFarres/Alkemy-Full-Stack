import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../assets/css/Home.css";

function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <div className="home_wrapper">
            <div className="home_container">
                <div className="home_block">
                    {success ? (
                        <div>
                            <h1 className="ms-3 c-white">You are logged in!</h1>
                            <p className="ms-5">
                                <Link to={"/"}>Go to Home</Link>
                            </p>
                        </div>
                    ) : (
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
                            <label
                                htmlFor="password"
                                className="block-title2 mt-3"
                            >
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
                                <button className="add_button add_text">
                                    Login
                                </button>
                            </div>
                            <p className="block-title3 mt-2">
                                Need an Account?
                            </p>
                            <Link
                                to={"/Register"}
                                className="block-title3 a3 mb-3"
                            >
                                Sign Up
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
