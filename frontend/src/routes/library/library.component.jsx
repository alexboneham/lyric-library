import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import LibraryList from '../../components/library-list.component';

import './library.styles.scss';

const Libary = () => {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    const makeFetch = async () => {
        const res = await fetch('http://localhost:8000/library');
        const data = await res.json();
        setAllSongs(data.songs)
    }
    makeFetch();
  }, [])

  return (
    <div className="library-container">
      <h1>Your Library</h1>
      <form>
        <input placeholder="search library" />
      </form>
      <div className="songs-container">
        {allSongs && <LibraryList songs={allSongs} />}
      </div>
      <Outlet />
    </div>
  );
};

export default Libary;
