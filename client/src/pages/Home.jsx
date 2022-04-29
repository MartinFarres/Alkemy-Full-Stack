import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Home.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import CardList from "../components/CardList";
import { Link } from "react-router-dom";

function Home() {
    const [operations, setOperations] = useState({});
    const [lastOperation, setLastOperation] = useState({});

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); //axios cancel request

        const getList = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/operations/getList/${auth.id}`,
                    {
                        signal: controller.signal, //cancel request if we need to
                    }
                );

                isMounted && setOperations(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getList();
        return () => {
            isMounted = false;
            controller.abort();
        }; //cleanup function
    }, []);

    useEffect(() => {
        let lastIndex = operations?.data?.operations.length - 1;
        setLastOperation(operations?.data?.operations[lastIndex]);
        console.log(lastOperation);
    }, [operations]);

    return (
        <>
            <div className="b-white t-block">
                <div className="inner-blocks total">
                    <div className="mx-auto">${operations?.meta?.netTotal}</div>
                </div>
            </div>
            <div className="b-white ">
                <div className="inner-blocks sum">
                    <div className="c-tile">
                        $+{operations?.meta?.netIncome}
                    </div>
                    <div className="c-red">
                        $-{operations?.meta?.netOutflows}
                    </div>
                </div>
            </div>
            <CardList
                index={"Last Added"}
                concept={lastOperation?.concept}
                date={lastOperation?.date}
                category={lastOperation?.categories?.category}
                type={lastOperation?.type}
                sum={lastOperation?.sum}
            />
            <Link to={"/AddItem"} className="add_button add_text">
                Add Item
            </Link>
        </>
    );
}

export default Home;
