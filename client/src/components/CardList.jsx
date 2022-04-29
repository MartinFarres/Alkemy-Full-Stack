import React from "react";
import { axiosPrivate } from "../api/axios";
import DeleteConfirm from "./DeleteConfirms";
import EditConfirm from "./EditConfirm";
import {
    faPenToSquare,
    faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardList = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const navigate = useNavigate();

    const handleDelete = async () => {
        const controller = new AbortController(); //axios cancel request
        const deleteItem = async () => {
            try {
                const response = await axiosPrivate.delete(
                    `operations/${props.id}`,
                    {
                        signal: controller.signal, //cancel request if we need to
                    }
                );
                handleClose();
                navigate("/Home", { replace: true });
            } catch (err) {
                console.log(err);
            }
        };
        deleteItem();
        return () => {
            controller.abort();
        };
    };

    const handleEdit = () => {
        navigate(`/EditItem/${props.id}`);
    };

    return (
        <React.Fragment>
            <DeleteConfirm
                showModal={show}
                handleClose={handleClose}
                handleDelete={handleDelete}
                operationId={props.index}
            />
            <EditConfirm
                showModal={showEdit}
                handleEdit={handleEdit}
                handleClose={handleCloseEdit}
                operationId={props.index}
            />
            <div className="b-white">
                <div className="inner-blocks last-block">
                    <span className="inner_title">{props.index}</span>
                    <span
                        className={
                            props.crudIcons ? "valid icon-rigth1" : "hide"
                        }
                        onClick={handleShowEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span
                        className={
                            props.crudIcons ? "invalid icon-rigth2" : "hide"
                        }
                        onClick={handleShow}
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
