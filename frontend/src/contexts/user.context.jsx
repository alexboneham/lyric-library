/* 
Handle all state regarding a User.
Are they signed in? Fetch and store CSRF Token, etc.
*/

import { useState, useEffect, createContext, useCallback } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const UserContext = createContext({
  csrfToken: null,
  isAuthenticated: null,
  setIsAuthenticated: () => null,
  loginUser: () => null,
  logoutUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCSRF = () => {
    // GET CSRF-Token from Django backend
    console.log('Get CSRF function running....');
    fetch('http://localhost:8000/csrf', {
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        console.log(`Old CSRF: ${csrfToken}`);
        console.log(`New CSRF: ${data.csrfToken}`);
        setCsrfToken(data.csrfToken);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    // Get session info from Django backend
    console.log('User context fetch running on mount...');
    fetch('http://localhost:8000/session', {
      credentials: 'include',
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          console.log('User is authenticated');
        } else {
          setIsAuthenticated(false);
          console.log('User is NOT authenticated');
        }
        getCSRF();
      })
      .catch((e) => console.log(e));
  }, []);

  const loginUser = (username, password) => {
    // Make call to Django backend to log user in
    console.log('User login function running...');
    console.log(`CSRF token to be used: ${csrfToken}`);

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        if (data.success) {
          console.log(data.success);
          setIsAuthenticated(true);
          getCSRF();
        } else if (data.error) {
          console.log(data.error);
        } else {
          console.log('Something else went wrong!');
        }
      })
      .catch((e) => console.log(e));
  };

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
        getCSRF();
      })
      .catch((e) => console.log(e));
  };

  const value = { csrfToken, isAuthenticated, setIsAuthenticated, loginUser, logoutUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
