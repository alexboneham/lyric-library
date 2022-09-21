import './song.styles.scss';

const Song = ({ song }) => {
  const { full_title } = song;

  return (
    <div>
      <h3>{full_title}</h3>
      {/* <img src={thumbnail_url} alt={title} onClick={onClickHandler}></img> */}
    </div>
  );
};

export default Song;
