import ButtonGroup from '../button-group/button-group.component';
import './song-item.styles.scss';

const SongItem = ({ song, description, thumbnail, buttonProps, actionProps }) => {
  if (thumbnail) {
    song['thumbnail_url'] = thumbnail;
  }

  const { editOpen = undefined, handleEditSubmit = undefined, handleEditChange = undefined } = actionProps;

  return (
    <div className="song-item-container">
      <div className="song-info-column">
        <h1 className="title">{song.title}</h1>
        <h2 className="artist">by {song.artist}</h2>
        <img src={song.thumbnail_url} alt={song.full_title} />
        <p className="description">{description}</p>
      </div>
      <div className="lyrics-column">
        <ButtonGroup buttonProps={buttonProps} />
        {editOpen ? (
          <form onSubmit={handleEditSubmit}>
            <textarea defaultValue={song.lyrics} cols={50} rows={50} onChange={handleEditChange} />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <p className="lyrics">{song.lyrics}</p>
        )}
      </div>
    </div>
  );
};

export default SongItem;
