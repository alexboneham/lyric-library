import Song from "../song/song.component";

import "./song-list.styles.scss"

const SongList = ({songs}) => (
  <div className="song-list">
    <ul>
      {songs.map((song) => {
        return <li><Song song={song} key={song.id}/></li>
      })}
    </ul>
  </div>
)

export default SongList;