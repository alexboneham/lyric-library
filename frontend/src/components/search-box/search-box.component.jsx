import './search-box.styles.scss';

const SearchBox = ({onSubmitHandler}) => (
  <div className='search-container'>
    <input className="library-search" placeholder="Find a song" type="search" name="q"/>
    <button type="submit" onSubmit={onSubmitHandler}>Search</button>
  </div>
);

export default SearchBox;
