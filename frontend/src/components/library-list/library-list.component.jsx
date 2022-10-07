import { Link } from 'react-router-dom';
import SongCard from '../song-card/song-card.component';
import './library-list.styles.scss';

const SearchMessage = () => (
  <div>
    <span>{'This song is not in your library, try '}</span>
    <Link to={'/search'}>{'searching'}</Link>
    <span>{' for it instead'}</span>
  </div>
);

const LibraryList = ({ songs, parent }) => {
  let message = () => null;

  switch (parent) {
    case 'setlist':
      message = () => 'This setlist is empty. Try adding a song';
      break;
    case 'library':
      message = SearchMessage;
      break;
    default:
      message = () => 'no message';
  }

  return (
    <div className="container">
      <div className="library-list-container">
        {songs.map((song) => (
          <div key={song.id} className="link-container">
            <Link to={`/library/${song.id.toString()}`} className="link-style">
              <SongCard song={song} />
            </Link>
          </div>
        ))}
      </div>
      {songs.length < 1 && <div>{message()}</div>}
    </div>
  );
};

export default LibraryList;
