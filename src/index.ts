import useAuth from "./Hooks/useAuth"

import AuthProvider from "./Components/AuthProvider"
import AuthRoute from "./Components/AuthRoute"
import PermissionRoute from "./Components/PermissionRoute"
import usePermission from "./Hooks/usePermission"
import useUser from "./Hooks/useUser"

export default useAuth

export { AuthProvider, AuthRoute, PermissionRoute, usePermission, useUser }
