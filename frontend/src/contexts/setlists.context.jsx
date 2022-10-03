import { createContext, useState, useEffect } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const SetlistsContext = createContext({
  setlists: [],
});

export const SetlistsProvider = ({ children }) => {
  const [setlists, setSetlists] = useState([]);

  useEffect(() => {
    // Get setlists from database
    fetch('http://localhost:8000/setlists')
      .then((res) => isResponseOk(res))
      .then((data) => setSetlists(data.setlists));
  }, []);

  const value = {
    setlists,
    setSetlists,
  };
  return <SetlistsContext.Provider value={value}>{children}</SetlistsContext.Provider>;
};
