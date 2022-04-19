import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Home.css";

function Home() {
    return (
        <div className="home_wrapper">
            <div className="home_container">
                <div className="home_block">
                    <div className="b-white t-block">
                        <div className="inner-blocks total">
                            <div className="mx-auto">$XXX</div>
                        </div>
                    </div>
                    <div className="b-white ">
                        <div className="inner-blocks sum">
                            <div className="c-tile">$XXX</div>
                            <div className="c-red">$XXX</div>
                        </div>
                    </div>
                    <div className="b-white">
                        <div className="inner-blocks last-block">
                            <span className="inner_title">Last Added</span>
                            <div className="card_row mx-2">
                                <div className="card-item pt-3">
                                    <div className="title-items-card">
                                        Concept
                                    </div>
                                    <div className="items-card"> Prueba</div>
                                </div>
                                <div className="vr"></div>
                                <div className="card-item">
                                    <div className="title-items-card">Date</div>
                                    <div className="items-card">03-05-2011</div>
                                    <div className="title-items-card">
                                        Category
                                    </div>
                                    <div className="items-card">Income</div>
                                </div>
                                <div className="vr"></div>
                                <div className="card-item pt-3">
                                    <div className="title-items-card ">Sum</div>
                                    <div className="items-card">$500</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="add_button add_text">Add Item</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
