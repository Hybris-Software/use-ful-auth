import useAuth from "./Hooks/useAuth";

import AuthProvider from "./Components/AuthProvider";
import AuthRoute from "./Components/AuthRoute";
import PermissionRoute from "./Components/PermissionRoute";
import usePermission from "./Hooks/usePermission";

export default useAuth;

export { AuthProvider, AuthRoute, PermissionRoute, usePermission };