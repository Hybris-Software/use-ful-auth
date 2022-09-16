import React, { useContext } from "react";

// Hooks
import useAuth from "../Hooks/useAuth";

//Componeets
import LoaderGlobal from "./LoaderGlobal/LoaderGlobal";

const AuthRoute = ({
  children,
  forLoggedUser,
  action,
  Loader = <LoaderGlobal />,
}) => {
  const authUrl = useContext(AuthProviderContext);
  const { isLogged } = useAuth({ url: authUrl });

  return (
    <>
      {isLogged === undefined ? (
        <Loader />
      ) : isLogged === forLoggedUser ? (
        children
      ) : (
        action()
      )}
    </>
  );
};

export default AuthRoute;
