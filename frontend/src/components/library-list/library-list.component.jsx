import { Link, useParams } from 'react-router-dom';

import SongCard from '../song-card/song-card.component';

import './library-list.styles.scss';

const LibraryList = ({ songs }) => {
  let { id = undefined } = useParams();

  return (
    <div className='container'>
      <div className='library-list-container'>
        {songs.map((song) => (
          <div key={song.id} className="link-container">
            <Link to={`/library/${song.id.toString()}`} className="link-style">
              <SongCard song={song} />
            </Link>
          </div>
        ))}
      </div>
      {songs.length < 1 && (
        id ? (
          <div>This setlist is empty. Try adding a song</div>
        ) : (
          <div>
            This song is not in your library, try <Link to={'/search'}>searching</Link> for it instead
          </div>
        )
      )}
    </div>
  );
};

export default LibraryList;
