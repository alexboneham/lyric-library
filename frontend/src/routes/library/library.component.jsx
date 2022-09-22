import { useState, useEffect } from 'react';

import SongList from '../../components/song-list/song-list.component'

import './library.styles.scss';

const Library = () => {
  const [songs, setSongs] = useState([]);
   const [errors, setErrors] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/library')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setErrors(true)
        } else {
          setSongs(data.songs);
        }
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <div className="library-container">
      {errors === true && <h2>Could not load any songs</h2>}
      <SongList songs={songs} />
    </div>
  );
};

export default Library;
