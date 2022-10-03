import './setlist-edit-form.styles.scss';

const SetlistEditForm = ({
  handleFormSubmit,
  handleSelectChange,
  setlistNameValue,
  setSetlistNameValue,
  selectSongs,
  librarySongs,
  buttonMessage,
}) => {

  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit} className="new-setlist-form">
        <label htmlFor="name">Setlist name: </label>
        <input
          name="name"
          id="name"
          value={setlistNameValue}
          placeholder="setlist name"
          className="form-input"
          onChange={(e) => setSetlistNameValue(e.target.value)}
          required
          autoComplete="off"
        />
        <label htmlFor="songs-menu">Select songs: </label>
        <select id="songs-menu" multiple={true} className="select-input" onChange={handleSelectChange} value={selectSongs}>
          {librarySongs &&
            librarySongs.map((song) => (
              <option value={song.id} key={song.id}>
                {song.title}
              </option>
            ))}
        </select>
        <span>
          <small>Hold down “Control”, or “Command” on a Mac, to select more than one.</small>
        </span>
        <button type="submit" className="form-button">
          {buttonMessage}
        </button>
      </form>
    </div>
  );
};

export default SetlistEditForm;
