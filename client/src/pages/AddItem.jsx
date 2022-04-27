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
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
const CONCEPT_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const SUM_REGEX = /^(?:0|[1-9][0-9]*)$/;

function Additem() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Home";

    const conceptRef = useRef();
    const errRef = useRef();

    const [concept, setConcept] = useState("");
    const [validName, setValidName] = useState(false);
    const [conceptFocus, setConceptFocus] = useState(false);

    const [sum, setSum] = useState("");
    const [validSum, setValidSum] = useState(false);
    const [sumFocus, setSumFocus] = useState(false);

    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        conceptRef.current.focus();
    }, []);

    useEffect(() => {
        const result = CONCEPT_REGEX.test(concept);
        setValidName(result);
    }, [concept]);

    useEffect(() => {
        const result = SUM_REGEX.test(sum);
        setValidSum(result);
    }, [sum]);

    useEffect(() => [setErrMsg("")], [concept, sum]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //backend validation
        const v1 = CONCEPT_REGEX.test(concept);
        const v2 = SUM_REGEX.test(sum);
        if (!v1 || !v2) {
            setErrMsg("Invalid entry");
            return;
        }

        const controller = new AbortController(); //axios cancel request
        const createItem = async () => {
            try {
                const response = await axiosPrivate.post(
                    "/operations/create",
                    {
                        userId: auth.id,
                        concept: concept,
                        date: date,
                        sum: sum,
                        type: type,
                        category: category,
                    },
                    {
                        signal: controller.signal, //cancel request if we need to
                    }
                );

                setConcept("");
                setSum("");
                setCategory("");
                setDate("");
                setType("");
                navigate(from, { replace: true });
            } catch (err) {
                if (!err?.response) {
                    setErrMsg("No server response");
                } else if (err.response?.status === 409) {
                    setErrMsg(err.response.data.errMessage);
                } else {
                    setErrMsg("Add Item Failed");
                }
                errRef.current.focus();
            }
        };
        createItem();
        return () => {
            controller.abort();
        }; //cleanup function
    };
    return (
        <form onSubmit={handleSubmit}>
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscren"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            {/* <h4 className="block-title">Add item</h4> */}

            <label className="block-title2" htmlFor="concept">
                Concept:
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !concept ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <div className="b-white mx-2">
                <input
                    type="text"
                    id="concept"
                    ref={conceptRef}
                    autoComplete="off"
                    onChange={(e) => setConcept(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setConceptFocus(true)}
                    onBlur={() => setConceptFocus(false)}
                    className="input-blocks"
                />
            </div>
            <p
                id="uidnote"
                className={
                    conceptFocus && concept && !validName
                        ? "instructions mx-2"
                        : "offscreen"
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 15 characters. <br />
                Must Begin with a letter <br />
                Letters, numbers, underscores, hypens allowed.
            </p>
            <label htmlFor="sum" className="block-title2 mt-3">
                Sum:
                <span className={validSum ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validSum || !sum ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <div className="b-white mx-2">
                <input
                    type="number"
                    id="sum"
                    autoComplete="off"
                    onChange={(e) => setSum(e.target.value)}
                    required
                    aria-invalid={validSum ? "true" : "false"}
                    aria-describedby="sumnote"
                    onFocus={() => setSumFocus(true)}
                    onBlur={() => setSumFocus(false)}
                    className="input-blocks"
                />
            </div>
            <p
                id="sumnote"
                className={
                    sumFocus && sum && !validSum
                        ? "instructions mx-2 mb-4"
                        : "offscreen"
                }
            >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid sum.
            </p>
            <label htmlFor="type" className="block-title2 mt-3">
                Type:
            </label>
            <span className={type ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>

            <div className="b-white mx-2">
                <select
                    name="type"
                    id="type"
                    className="input-blocks"
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">
                        -- Please select the type of operation --
                    </option>
                    <option value="income">Income</option>
                    <option value="outflows">Outflow</option>
                </select>
            </div>
            <label htmlFor="category" className="block-title2 mt-3">
                Category:
            </label>
            <span className={category ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <div className="b-white mx-2">
                <select
                    name="category"
                    id="category"
                    className="input-blocks"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">-- Please select the category --</option>
                    <option value="Food">Food</option>
                    <option value="Tax and Payments">Tax and Payments</option>
                    <option value="House">House</option>
                    <option value="Transport">Transport</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Health and Hygiene">
                        Health and Hygiene
                    </option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Salary">Salary</option>
                    <option value="Salary">Investments</option>
                    <option value="Salary">Other</option>
                </select>
            </div>
            <label htmlFor="categiry" className="block-title2 mt-3">
                Date:
            </label>
            <span className={date ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <div className="b-white mx-2">
                <input
                    type="date"
                    id="date"
                    autoComplete="off"
                    required
                    className="input-blocks"
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="mx-2 my-3">
                <button
                    disabled={
                        !validName || !validSum || !date || !type || !category
                            ? true
                            : false
                    }
                    className="add_button add_text"
                >
                    Add Item
                </button>
            </div>
        </form>
    );
}

export default Additem;
