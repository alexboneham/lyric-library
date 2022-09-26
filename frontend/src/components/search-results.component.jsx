import { Fragment } from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ songs }) => {

  return (
    <Fragment>
        <ul style={{listStyleType: 'none'}}>
        {songs.map((song) => {
            return (
              <li key={song.result.id}>
                <Link to={song.result.id.toString()} >{song.result.full_title}</Link>
              </li>
            )
        })}
        </ul>
    </Fragment>
  );
};

export default SearchResults;
