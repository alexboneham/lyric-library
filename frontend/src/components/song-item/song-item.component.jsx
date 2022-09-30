// import ButtonGroup from '../button-group/button-group.component';
import './song-item.styles.scss';

const SongItem = ({ song, description, thumbnail, buttonProps }) => {
  if (thumbnail) {
    song['thumbnail_url'] = thumbnail;
  }

  const { inLibrary = undefined, handler = undefined } = buttonProps;

  return (
    <div className="song-item-container">
      <div className="song-info-column">
        <h1 className="title">{song.title}</h1>
        <h2 className="artist">by {song.artist}</h2>
        <img src={song.thumbnail_url} alt={song.full_title} />
        <p className="description">{description}</p>
      </div>
      <div className="lyrics-column">
        {inLibrary !== undefined && (
          <button disabled={inLibrary ? true : false} onClick={handler}>
            {inLibrary ? 'Added to library!' : 'Add to library'}
          </button>
        )}
        <p className="lyrics">{song.lyrics}</p>
      </div>
    </div>
  );
};

export default SongItem;
