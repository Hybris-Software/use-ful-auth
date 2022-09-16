import React from "react";
import AuthProviderContext from "../Context/AuthProviderContext";

import { ApiProvider } from "@hybris-software/use-query";

const AuthProvider = ({ children, apiClient, authUrl }) => {
    return (
        <AuthProviderContext.Provider authUrl={authUrl}>
            <ApiProvider apiClient={apiClient}>
                {children}
            </ApiProvider>
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider;
