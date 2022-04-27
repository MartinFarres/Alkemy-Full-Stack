import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Home.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import CardList from "../components/CardList";
import { Link } from "react-router-dom";

function List() {
    const [operations, setOperations] = useState({});
    const [operation, setLastOperation] = useState({});

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

    return (
        <div className="my-3">
            {operations?.data?.operations.map((operation, index) => {
                return (
                    <div className="my-3" key={index}>
                        <CardList
                            key={index}
                            id={index + 1}
                            concept={operation?.concept}
                            date={operation?.date}
                            category={operation?.categories?.category}
                            type={operation?.type}
                            sum={operation?.sum}
                            crudIcons={true}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default List;
