import { useState, useEffect, useContext } from 'react';

import LibraryList from '../../components/library-list/library-list.component';
import { LibraryContext } from '../../contexts/library.context';

import './library.styles.scss';

const Libary = () => {
  const { librarySongs } = useContext(LibraryContext);

  const [searchValue, setSearchValue] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(librarySongs);

  useEffect(() => {
    const newFilteredSongs = librarySongs.filter((song) => {
      return song.title.toLowerCase().includes(searchValue) || song.artist.toLowerCase().includes(searchValue);
    });
    setFilteredSongs(newFilteredSongs);
  }, [searchValue, librarySongs]);

  const changeHandler = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <div className="library-container">
      <h1>Your Library</h1>
      <form>
        <input placeholder="search library" name="search-value" onChange={changeHandler} autoComplete={'off'} />
      </form>
      <div className="songs-container">{filteredSongs && <LibraryList songs={filteredSongs} />}</div>
    </div>
  );
};

export default Libary;
