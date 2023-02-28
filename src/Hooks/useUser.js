// React
import React, { useContext } from 'react';

// Contexts
import UserInfoContext from '../Context/UserInfoContext';

const useUser = () => {
  const { userInfo } = useContext(UserInfoContext);
  return { userInfo };
};

export default useUser;
