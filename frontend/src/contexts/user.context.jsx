/* 
Handle all state regarding a User.
Are they signed in? Fetch and store CSRF Token, etc.
*/

import { useState, useEffect, createContext } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const UserContext = createContext({
  csrfToken: null,
  isAuthenticated: null,
  setIsAuthenticated: () => null,
  logoutUser: () => null,
  user: {},
  setUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Get session info from Django backend
    console.log('Get session fetch running on mount...');

    fetch('http://localhost:8000/session', {
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        if (data.isAuthenticated) {
          console.log('User is authenticated');
          setIsAuthenticated(true);
        } else {
          console.log('User is NOT authenticated');
          setIsAuthenticated(false);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // Get CSRF from Django backend each time is authenticated changes
    console.log('Get CSRF useEffect running....');

    fetch('http://localhost:8000/csrf', {
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        setCsrfToken(data.csrfToken);
      })
      .catch((e) => console.log(e));
  }, [isAuthenticated]);

  const logoutUser = () => {
    // Make call to Django back to log user out
    console.log('Logout fetch function running...');

    fetch('http://localhost:8000/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(data);
        setIsAuthenticated(false);
        setUser({});
      })
      .catch((e) => console.log(e));
  };

  const value = { csrfToken, isAuthenticated, setIsAuthenticated, logoutUser, user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
