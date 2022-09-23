import { Link } from 'react-router-dom';

const SongResult = ({ song }) => {
    const { id, full_title } = song;

  return <Link to={id.toString()}>{full_title}</Link>;
};

export default SongResult;
