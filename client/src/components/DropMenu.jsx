import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBills } from "@fortawesome/free-solid-svg-icons";

const DropMenu = () => {
    const [currency, setCurrency] = useState("USD");
    function changeCurrency(e) {
        document.querySelector(".drop_item.active").classList.remove("active");
        let items = document.querySelectorAll(".drop_item");
        const selectedItem = Object.values(items).filter((item) => {
            return e.target === item;
        });
        selectedItem[0].classList.add("active");
        setCurrency(e.target.innerText);
    }
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className="currency_selector btn-dark">
                    <FontAwesomeIcon
                        icon={faMoneyBills}
                        className="dollar_icon"
                    />
                    <span>{currency}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="drop_menu">
                    <Dropdown.Item
                        onClick={changeCurrency}
                        className="drop_item active"
                    >
                        USD
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={changeCurrency}
                        className="drop_item"
                    >
                        EUR
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={changeCurrency}
                        className="drop_item"
                    >
                        ARS
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={changeCurrency}
                        className="drop_item"
                    >
                        AUD
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={changeCurrency}
                        className="drop_item"
                    >
                        GBP
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default DropMenu;
