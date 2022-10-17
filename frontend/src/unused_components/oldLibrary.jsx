{librarySongs.length < 1 ? (
    <div className="empty-library-message">Your library is empty</div>
  ) : (
    <div className="songs-container">
      {filteredSongs && <LibraryList songs={filteredSongs} parent={'library'} />}
    </div>
  )}