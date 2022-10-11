import { useState, useEffect, createContext } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const UserContext = createContext({
  csrfToken: null,
});

export const UserProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/csrf', {
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => setCsrfToken(data.csrfToken));
  }, []);

  const value = { csrfToken };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
