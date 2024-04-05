import React, { useState } from "react"

// Hooks
import { ApiProvider } from "@hybrissoftware/use-ful-query"

// Contexts
import AuthProviderContext from "../Context/AuthProviderContext"
import PermissionProviderContext from "../Context/PermissionProviderContext"
import UserInfoContext from "../Context/UserInfoContext"

export type AuthProviderProps = {
  children: React.ReactNode
  apiClient: any
  authUrl: string
}

const AuthProvider = ({ children, apiClient, authUrl }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState({})
  const [permission, setPermission] = useState(false)

  return (
    <AuthProviderContext.Provider value={authUrl}>
      <PermissionProviderContext.Provider value={[permission, setPermission]}>
        <ApiProvider apiClient={apiClient}>
          <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
          </UserInfoContext.Provider>
        </ApiProvider>
      </PermissionProviderContext.Provider>
    </AuthProviderContext.Provider>
  )
}

export default AuthProvider
