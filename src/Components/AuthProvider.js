import React, { useState } from "react";

// Contexts
import AuthProviderContext from "../Context/AuthProviderContext";
import PermissionProviderContext from "../Context/PermissionProviderContext";

import { ApiProvider } from "@hybris-software/use-query";

const AuthProvider = ({ children, apiClient, authUrl }) => {

    const [permission, setPermission] = useState(undefined);

    return (
        <AuthProviderContext.Provider value={authUrl}>
            <PermissionProviderContext.Provider value={[permission, setPermission]}>
                <ApiProvider apiClient={apiClient}>
                    {children}
                </ApiProvider>
            </PermissionProviderContext.Provider>
        </AuthProviderContext.Provider >
    );
};

export default AuthProvider;
