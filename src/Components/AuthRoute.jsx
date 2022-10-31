import React, { useState, useContext, useEffect } from "react";

// Hooks
import useAuth from "../Hooks/useAuth";

//Componeets
import LoaderGlobal from "./LoaderGlobal/LoaderGlobal";

// Context
import AuthProviderContext from "../Context/AuthProviderContext";

const AuthRoute = ({
  children,
  forLoggedUser,
  action,
  minimumLoadingTime = 1000,
  loader = <LoaderGlobal />,
  apiLoading = false,
}) => {
  const authUrl = useContext(AuthProviderContext);
  const { isLogged, isLoading } = useAuth({ url: authUrl });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, minimumLoadingTime);
  }, []);

  useEffect(() => {
    if (isLogged !== undefined && loading === false) {
      if (isLogged !== forLoggedUser) {
        action();
      }
    }
  }, [isLogged, loading]);

  if (loading || isLoading || apiLoading) {
    return loader;
  } else if (isLogged === forLoggedUser) {
    return children;
  } else {
    return <></>;
  }
};

export default AuthRoute;
