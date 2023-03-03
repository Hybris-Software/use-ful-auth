// React
import React, { useContext } from 'react';

// Hooks
import useQuery from '@hybris-software/use-query/dist/Hooks/useQuery';

// Contexts
import UserInfoContext from '../Context/UserInfoContext';
import AuthProviderContext from '../Context/AuthProviderContext';

const useUser = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const authUrl = useContext(AuthProviderContext);

  const userInfoQuery = useQuery({
    url: authUrl,
    method: 'GET',
    executeImmediately: false,
    onSuccess: (response) => {
      setUserInfo(response.data);
    },
    onUnauthorized: (error) => {
      setUserInfo({});
    },
  });

  const refreshUserInfo = () => {
    userInfoQuery.executeQuery();
  };

  return { userInfo, refreshUserInfo };
};

export default useUser;
