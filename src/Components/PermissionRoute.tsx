import React, { useState, useContext, useEffect } from "react"

// Hooks
import useAuth from "../Hooks/useAuth"

//Componeets
import LoaderGlobal from "./LoaderGlobal/LoaderGlobal"

// Context
import AuthProviderContext from "../Context/AuthProviderContext"

export type PermissionRouteProps = {
  children: React.ReactNode
  forLoggedUser: boolean
  unAuthorizedAction: () => void
  minimumLoadingTime?: number
  loader?: React.ReactNode
  apiLoading?: boolean
  firstApiLoading?: boolean
  permissionController?: (data: any) => boolean
}

const PermissionRoute = ({
  children,
  forLoggedUser,
  unAuthorizedAction,
  minimumLoadingTime = 1000,
  loader = <LoaderGlobal />,
  apiLoading = false,
  firstApiLoading = false,
  permissionController = () => {
    return true
  },
}: PermissionRouteProps) => {
  const authUrl = useContext(AuthProviderContext)
  const [permission, setPermission] = useState(false)

  const { isLogged, isLoading, data } = useAuth({ url: authUrl })
  const [loading, setLoading] = useState(true)
  const [firstLoading, setFirstLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, minimumLoadingTime)
  }, [])

  useEffect(() => {
    if (firstApiLoading === false) {
      setFirstLoading(false)
    }
  }, [firstApiLoading])

  useEffect(() => {
    if (isLogged !== undefined && loading === false) {
      if (isLogged !== forLoggedUser) {
        unAuthorizedAction()
      } else {
        const permissionControllerResult = permissionController(data)
        setPermission(permissionControllerResult || false)
      }
    }
  }, [isLogged, loading])

  if (
    loading ||
    isLoading ||
    permission === false ||
    apiLoading ||
    (firstApiLoading && firstLoading)
  ) {
    return loader
  } else if (isLogged === forLoggedUser && permission) {
    return children
  } else {
    return <></>
  }
}

export default PermissionRoute
