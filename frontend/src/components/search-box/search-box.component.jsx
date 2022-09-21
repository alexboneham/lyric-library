import './search-box.styles.scss';

const SearchBox = ({submitHandler}) => {

  return (
    <div className="search-container">
      <form>
        <input className="search-input" placeholder="Find a song" type="search" name="q" required />
        <button type="submit" onSubmit={submitHandler}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
