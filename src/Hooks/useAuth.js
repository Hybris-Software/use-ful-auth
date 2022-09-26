import React, { useState } from "react";

// Hooks
import useQuery from "@hybris-software/use-query/dist/Hooks/useQuery";

const useAuth = ({ url, method = "GET", executeImmediately = true, onSuccess = () => { }, onUnauthorized = () => { }, onError = () => { } }) => {
    const [isLogged, setIsLogged] = useState(undefined);

    const { isLoading, isError, isSuccess, data, error, executeQuery } = useQuery({
        url: url,
        method: method,
        executeImmediately: executeImmediately,
        onSuccess: (response) => {
            setIsLogged(true);
            onSuccess(response);
        },
        onUnauthorized: (error) => {
            setIsLogged(false);
            onUnauthorized(error);
        },
        onError: (error) => {
            localStorage.removeItem("token");
            setIsLogged(false);
            onError(error);
        }
    })

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
