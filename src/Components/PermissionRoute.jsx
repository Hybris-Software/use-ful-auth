import React, { useState, useContext, useEffect } from "react";

// Hooks
import useAuth from "../Hooks/useAuth";

//Componeets
import LoaderGlobal from "./LoaderGlobal/LoaderGlobal";

// Context
import AuthProviderContext from "../Context/AuthProviderContext";
import PermissionProviderContext from "../Context/PermissionProviderContext";

const PermissionRoute = ({
  children,
  forLoggedUser,
  unAuthorizedAction,
  minimumLoadingTime = 1000,
  loader = <LoaderGlobal />,
  apiLoading = false,
  permissionController = () => {
    return true;
  },
}) => {
  const authUrl = useContext(AuthProviderContext);
  const [permission, setPermission] = useContext(PermissionProviderContext);

  const { isLogged, isLoading, data } = useAuth({ url: authUrl });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPermission(false);
    setTimeout(() => {
      setLoading(false);
    }, minimumLoadingTime);
  }, []);

  useEffect(() => {
    if (isLogged !== undefined && loading === false) {
      if (isLogged !== forLoggedUser) {
        unAuthorizedAction();
      } else {
        const permissionControllerResult = permissionController(data);
        setPermission(permissionControllerResult || false);
      }
    }
  }, [isLogged, loading]);

  if (loading || isLoading || permission === false || apiLoading) {
    return loader;
  } else if (isLogged === forLoggedUser && permission) {
    return children;
  } else {
    return <></>;
  }
};

export default PermissionRoute;
