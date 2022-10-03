import { createContext, useState, useEffect } from 'react';
import { isResponseOk } from '../utils/helper-functions';

export const SetlistContext = createContext({
  setlists: [],
});

export const SetlistProvider = ({ children }) => {
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
  return <SetlistContext.Provider value={value}>{children}</SetlistContext.Provider>;
};
