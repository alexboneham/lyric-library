import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import SongItem from '../../components/song-item/song-item.component';
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

  const editSong = () => console.log('edited');
  const deleteSong = () => console.log('deleted');

  const buttonProps = {
    handleDelete: deleteSong,
    handleEdit: editSong,
  };

  return (
    <Fragment>
      <SongItem song={song} description={song.description} buttonProps={buttonProps} />
    </Fragment>
  );
};

export default LibraryItem;
