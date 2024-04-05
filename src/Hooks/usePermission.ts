import React, { useContext } from "react"

import PermissionProviderContext from "../Context/PermissionProviderContext"

const usePermssion = () => {
  const [permission, setPermission] = useContext(PermissionProviderContext)
  return { permission, setPermission }
}

export default usePermssion
