import ButtonGroup from '../button-group/button-group.component';
import './song-item.styles.scss';

const SongItem = ({ song, description, thumbnail, buttonProps, actionProps }) => {
  const {
    editOpen = undefined,
    handleEditSubmit = undefined,
    handleEditChange = undefined,
    addToSetlistOpen = undefined,
  } = actionProps;

  if (thumbnail) {
    song['thumbnail_url'] = thumbnail;
  }

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
        {addToSetlistOpen && (
          <form>
            <select>
              <option>Setlist 1</option>
              <option>Setlist 2</option>
              <option>Setlist 3</option>
            </select>
            <button type='submit'>Add</button>
          </form>
        )}
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
