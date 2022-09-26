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
}) => {
  const authUrl = useContext(AuthProviderContext);
  const { isLogged } = useAuth({ url: authUrl });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogged !== undefined) {
      setTimeout(() => {
        setLoading(false);
        if (isLogged !== forLoggedUser) {
          action();
        }
      }, minimumLoadingTime);
    }
  }, [isLogged]);

  return <>{loading ? loader : isLogged === forLoggedUser && children}</>;
};

export default AuthRoute;
