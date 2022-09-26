import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './library-item.styles.scss';

const LibraryItem = () => {
  const { id } = useParams();
  const [song, setSong] = useState({});

  useEffect(() => {
    console.log('Inside fetch useEffect...')
    const fetchSong = async () => {
      const res = await (await fetch(`http://localhost:8000/library/${id}`)).json();
      setSong(res);
    };
    fetchSong()
  }, []);

  return (
    <div className='library-item-container'>
      <h1 className='title'>{song.title}</h1>
      <h2 className='artist'>by {song.artist}</h2>
      <p className='lyrics'>{song.lyrics}</p>
    </div>
  )
};

export default LibraryItem;
