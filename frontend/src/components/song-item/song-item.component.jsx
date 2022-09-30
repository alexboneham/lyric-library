import './song-item.styles.scss';

const SongItem = ({song, description, thumbnail}) => {
    if (thumbnail) {
        song['thumbnail_url'] = thumbnail;
    }

  return (
    <div className="song-item-container">
      <div className="song-info">
        <h1 className="title">{song.title}</h1>
        <h2 className="artist">by {song.artist}</h2>
        <img src={song.thumbnail_url} alt={song.full_title} />
        <p className="description">{description}</p>
      </div>
      <div className="lyrics-container">
        <p className="lyrics">{song.lyrics}</p>
      </div>
    </div>
  );
};

export default SongItem;
