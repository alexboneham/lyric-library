import { Fragment } from "react";

import SongResult from "./song-result.component";

const ResultList = ({ songs }) => {
  return (
    <Fragment>
        <ul style={{listStyleType: 'none'}}>
        {songs.map((song) => {
            return <li key={song.result.id}><SongResult song={song.result}/></li>
        })}
        </ul>
    </Fragment>
  );
};

export default ResultList;
