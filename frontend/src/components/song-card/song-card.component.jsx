import './song-card.styles.scss';

const SongCard = ({ song }) => (
  <div className="card-container">
    <div className="header">
      <span>{song.title}</span>
    </div>
    <img src={song.thumbnail_url} alt={song.full_title} />
  </div>
);

export default SongCard;
