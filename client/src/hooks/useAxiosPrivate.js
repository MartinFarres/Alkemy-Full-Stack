//attached the interceptor to this axios instance
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        //attache interceptors
        const requestIntercep = axiosPrivate.interceptors.request.use(
            (config) => {
                //first attempt
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth.accessToken}`;
                }

                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        const responseIntercep = axiosPrivate.interceptors.response.use(
            (response) => response,
            //if tokens expire or errors, then:
            async (err) => {
                const prevReq = err?.config;
                //forbiden error and wasn't send
                if (err?.response?.status === 403 && !prevReq.sent) {
                    prevReq.sent = true; //prevents 403 loop err
                    const newAccesToken = await refresh();
                    prevReq.headers[
                        "Authorization"
                    ] = `Bearer ${newAccesToken}`;
                    return axiosPrivate(prevReq);
                }
                return Promise.reject(err);
            }
        );

        //cleanup function
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercep);
            axiosPrivate.interceptors.request.eject(requestIntercep);
        };
    }, [auth, refresh]);

    return axiosPrivate; //return axiosPrivate with interceptors
};

export default useAxiosPrivate;
