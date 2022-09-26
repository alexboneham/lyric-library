import { Link } from 'react-router-dom';

import SongCard from '../song-card/song-card.component';

import './library-list.styles.scss';

const LibraryList = ({ songs }) => {
  return (
    <div className='container'>
      <div className='library-list-container'>
        {songs.map((song) => (
          <div key={song.id} className="link-container">
            <Link to={`${song.id.toString()}`} className="link-style">
              <SongCard song={song} />
            </Link>
          </div>
        ))}
      </div>
      {songs.length < 1 && (
        <div>
          This song is not in your library, try <Link to={'/search'}>searching</Link> for it instead
        </div>
      )}
    </div>
  );
};

export default LibraryList;
