import React, { useState, useEffect, useContext } from "react";

// Hooks
import useQuery from "@hybris-software/use-query/dist/Hooks/useQuery";

// Contexts
import UserInfoContext from "../Context/UserInfoContext";


const useAuth = ({ url, method = "GET", executeImmediately = true, onSuccess = () => { }, onUnauthorized = () => { }, onError = () => { } }) => {
    const { setUserInfo } = useContext(UserInfoContext);
    const [isLogged, setIsLogged] = useState(undefined);
    const { isLoading, isError, isSuccess, data, error, executeQuery } = useQuery({
        url: url,
        method: method,
        executeImmediately: false,
        onSuccess: (response) => {
            setIsLogged(true);
            setUserInfo(response.data);
            onSuccess(response);
        },
        onUnauthorized: (error) => {
            localStorage.removeItem("token");
            setIsLogged(false);
            onUnauthorized(error);
        },
        onError: (error) => {
            setIsLogged(false);
            onError(error);
        }
    })

    useEffect(() => {
        if (executeImmediately) {
            executeQuery()
        }
    }, [])

    return {
        isLogged: isLogged,
        isLoading: isLoading,
        isError: isError,
        isSuccess: isSuccess,
        data: data,
        error: error,
        executeQuery: executeQuery
    }
}

export default useAuth;
