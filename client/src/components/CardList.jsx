import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
    faPenToSquare,
    faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardList = (props) => {
    const deleteOp = (operationId) => {};
    return (
        <React.Fragment>
            <div className="b-white">
                <div className="inner-blocks last-block">
                    <span className="inner_title">{props.id}</span>
                    <span
                        className={
                            props.crudIcons ? "valid icon-rigth1" : "hide"
                        }
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span
                        className={
                            props.crudIcons ? "invalid icon-rigth2" : "hide"
                        }
                        onClick={deleteOp(props.id)}
                    >
                        <FontAwesomeIcon icon={faSquareMinus} />
                    </span>
                    <div className="card_row mx-2">
                        <div className="card-item pt-3">
                            <div className="title-items-card">Concept</div>
                            <div className="items-card"> {props.concept}</div>
                        </div>
                        <div className="vr"></div>
                        <div className="card-item">
                            <div className="title-items-card">Date</div>
                            <div className="items-card">{props.date}</div>
                            <div className="title-items-card">Category</div>
                            <div className="items-card">{props.category}</div>
                        </div>
                        <div className="vr"></div>
                        <div className="card-item pt-3">
                            <div className="title-items-card ">Sum</div>
                            <div
                                className={
                                    props.type === "income"
                                        ? "items-card c-tile"
                                        : "items-card c-red"
                                }
                            >
                                ${props.sum}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CardList;
