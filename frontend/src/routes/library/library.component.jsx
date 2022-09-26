import { useState, useEffect } from 'react';

import LibraryList from '../../components/library-list.component';

import './library.styles.scss';

const Libary = () => {
  const [allSongs, setAllSongs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(allSongs);

  useEffect(() => {
    const makeFetch = async () => {
        const res = await fetch('http://localhost:8000/library');
        const data = await res.json();
        setAllSongs(data.songs)
    }
    makeFetch();
  }, [])

  useEffect(() => {
    const newFilteredSongs = allSongs.filter((song) => {
      return song.title.toLowerCase().includes(searchValue);
    })
    setFilteredSongs(newFilteredSongs);
  }, [searchValue, allSongs])

  const changeHandler = (e) => {
    setSearchValue(e.target.value.toLowerCase())
  }

  return (
    <div className="library-container">
      <h1>Your Library</h1>
      <form>
        <input placeholder="search library" name="search-value" onChange={changeHandler}/>
      </form>
      <div className="songs-container">
        {filteredSongs && <LibraryList songs={filteredSongs} />}
      </div>
    </div>
  );
};

export default Libary;
