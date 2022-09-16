import React from "react";
import AuthProviderContext from "../Context/AuthProviderContext";

import { ApiProvider } from "@hybris-software/use-query";

const AuthProvider = ({ children, apiClient, authUrl }) => {
    return (
        <AuthProviderContext.Provider value={authUrl}>
            <ApiProvider apiClient={apiClient}>
                {children}
            </ApiProvider>
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;
