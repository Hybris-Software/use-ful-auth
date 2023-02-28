import React, { useState } from "react";

// Contexts
import AuthProviderContext from "../Context/AuthProviderContext";
import PermissionProviderContext from "../Context/PermissionProviderContext";
import UserInfoContext from "../Context/UserInfoContext";

import { ApiProvider } from "@hybris-software/use-query";

const AuthProvider = ({ children, apiClient, authUrl }) => {
    const [userInfo, setUserInfo] = useState({});
    const [permission, setPermission] = useState(false);

    return (
        <AuthProviderContext.Provider value={authUrl}>
            <PermissionProviderContext.Provider value={[permission, setPermission]}>
                <ApiProvider apiClient={apiClient}>
                    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
                        {children}
                    </UserInfoContext.Provider>
                </ApiProvider>
            </PermissionProviderContext.Provider>
        </AuthProviderContext.Provider >
    );
};

export default AuthProvider;
