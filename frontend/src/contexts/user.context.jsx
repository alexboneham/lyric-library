import { useState, useEffect, createContext } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const UserContext = createContext({
  csrfToken: null,
});

export const UserProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    console.log('User context fetch running on mount...');
    fetch('http://localhost:8000/csrf', {
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  const value = { csrfToken };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
