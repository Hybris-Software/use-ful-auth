import React, { useState } from "react";

// Hooks
import useQuery from "@hybris-software/use-query/dist/Hooks/useQuery";

const useAuth = ({ url, method = "GET" }) => {
    const [isLogged, setIsLogged] = useState(undefined);

    const { isLoading } = useQuery({
        url: url,
        method: method,
        executeImmediately: true,
        onSuccess: (response) => {
            setIsLogged(true);
        },
        onUnauthorized: (error) => {
            setIsLogged(false);
        },
        onError: (error) => {
            setIsLogged(false);
        }
    })

    return { isLogged, isLoading };
}

export default useAuth;
''