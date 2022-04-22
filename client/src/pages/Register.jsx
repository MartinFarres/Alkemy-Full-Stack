import React from "react";
import { useEffect, useState, useRef } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/Home.css";
import "../assets/css/validation.css";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_-]).{8,24}$/;
const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => [setErrMsg("")], [user, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //backend validation
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid entry");
            return;
        }
        try {
            const response = await axios.post("/users/register", {
                user: user,
                password: pwd,
                email: email,
            });

            setSuccess(true);
            setUser("");
            setPwd("");
            setMatchPwd("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server response");
            } else if (err.response?.status === 409) {
                setErrMsg(err.response.data.errMessage);
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
    };
    return (
        <div className="home_wrapper">
            <div className="home_container">
                <div className="home_block">
                    {success ? (
                        <div>
                            <h1 className="ms-3 c-white">Succes!</h1>
                            <p className="ms-5">
                                <Link to={"/Login"}>Sign In</Link>
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p
                                ref={errRef}
                                className={errMsg ? "errmsg" : "offscren"}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                            <h4 className="block-title">Register</h4>

                            <label className="block-title2" htmlFor="username">
                                Username:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validName || !user ? "hide" : "invalid"
                                    }
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <div className="b-white mx-2">
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                    className="input-blocks"
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    userFocus && user && !validName
                                        ? "instructions mx-2"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters. <br />
                                Must Begin with a letter <br />
                                Letters, numbers, underscores, hypens allowed.
                            </p>
                            <label
                                htmlFor="email"
                                className="block-title2 mt-3"
                            >
                                Email:
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validEmail || !email
                                            ? "hide"
                                            : "invalid"
                                    }
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <div className="b-white mx-2">
                                <input
                                    type="email"
                                    id="email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-invalid={validEmail ? "true" : "false"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    className="input-blocks"
                                />
                            </div>
                            <p
                                id="emailnote"
                                className={
                                    emailFocus && email && !validEmail
                                        ? "instructions mx-2 mb-4"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must be a valid email.
                            </p>
                            <label
                                htmlFor="password"
                                className="block-title2 mt-3"
                            >
                                Password:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={validPwd ? "valid" : "hide"}
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validPwd || !pwd ? "hide" : "invalid"
                                    }
                                />
                            </label>
                            <div className="b-white mx-2">
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className="input-blocks"
                                />
                            </div>
                            <p
                                id="uidnote"
                                className={
                                    pwdFocus && !validPwd
                                        ? "instructions mx-2"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters. <br />
                                Must include uppercase and lowwer case letters,
                                a number and a special character. <br />
                                Allowed special characters:{" "}
                                <span aria-label="exclamation-mark">!</span>
                                <span aria-label="at symbol">@</span>{" "}
                                <span aria-label="hashtag">#</span>{" "}
                                <span aria-label="dollar sign">$</span>{" "}
                                <span aria-label="percent">%</span>{" "}
                                <span aria-label="underscore">_</span>{" "}
                                <span aria-label="hyphen">-</span>.
                            </p>
                            <label
                                htmlFor="confirm_password"
                                className="block-title2 mt-3"
                            >
                                Confirm Password:
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={
                                        validMatch && matchPwd
                                            ? "valid"
                                            : "hide"
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={
                                        validMatch || !matchPwd
                                            ? "hide"
                                            : "invalid"
                                    }
                                />
                            </label>
                            <div className="b-white mx-2">
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) =>
                                        setMatchPwd(e.target.value)
                                    }
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className="input-blocks"
                                />
                            </div>
                            <p
                                id="confirmnote"
                                className={
                                    matchFocus && !validMatch
                                        ? "instructions mx-2 mb-4"
                                        : "offscreen"
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                            <div className="mx-2 mt-3">
                                <button
                                    disabled={
                                        !validName ||
                                        !validEmail ||
                                        !validPwd ||
                                        !validMatch
                                            ? true
                                            : false
                                    }
                                    className="add_button add_text"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="block-title3 mt-2">
                                Alredy Register?
                            </p>
                            <Link
                                to={"/Login"}
                                className="block-title3 a3 mb-3"
                            >
                                Sign In
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
