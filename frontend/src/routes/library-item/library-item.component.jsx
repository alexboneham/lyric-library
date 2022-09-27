import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './library-item.styles.scss';

const LibraryItem = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});

  useEffect(() => {
    const fetchSong = async () => {
      const res = await (await fetch(`http://localhost:8000/library/${id}`)).json();
      setSong(res);
    };
    fetchSong();
  }, [id]);

  return (
    <div className="library-item-container">
      <div className="song-info">
        <h1 className="title">{song.title}</h1>
        <h2 className="artist">by {song.artist}</h2>
        <img src={song.thumbnail_url} alt={song.full_title} />
        <p className='description'>{song.description}</p>
      </div>
      <div className="lyrics-container">
        <p className="lyrics">{song.lyrics}</p>
      </div>
    </div>
  );
};

export default LibraryItem;
