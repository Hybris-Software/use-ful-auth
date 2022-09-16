import React, { useContext } from "react";

// Hooks
import useAuth from "../Hooks/useAuth";

//Componeets
import LoaderGlobal from "./LoaderGlobal/LoaderGlobal";

// Context
import AuthProviderContext from "../Context/AuthProviderContext";

const AuthRoute = ({ children, forLoggedUser, action, loader }) => {
  const authUrl = useContext(AuthProviderContext);
  const { isLogged } = useAuth({ url: authUrl });

  const loader = loader ? loader : <LoaderGlobal />;
  return (
    <>
      {isLogged === undefined ? (
        loader
      ) : isLogged === forLoggedUser ? (
        children
      ) : (
        action()
      )}
    </>
  );
};

export default AuthRoute;
