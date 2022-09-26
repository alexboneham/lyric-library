import { Link } from 'react-router-dom';

const LibraryList = ({ songs }) => (
  <div>
    <ul style={{ listStyleType: 'none' }}>
      {songs.map((song) => {
        return (
          <li key={song.id}>
            <Link to={`${song.id.toString()}`}>{song.full_title}</Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default LibraryList;
