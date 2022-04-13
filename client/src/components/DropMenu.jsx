import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons";

const DropMenu = () => {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle>
                    <FontAwesomeIcon
                        icon={faMoneyBills}
                        className="dollar_icon"
                    />
                    <span>USD</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="drop_menu">
                    <Dropdown.Item
                        href="#/action-1"
                        className="drop_item active"
                    >
                        USD
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" className="drop_item">
                        EUR
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" className="drop_item">
                        ARS
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-4" className="drop_item">
                        AUD
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-5" className="drop_item">
                        GBP
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default DropMenu;
