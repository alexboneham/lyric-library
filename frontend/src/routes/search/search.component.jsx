import SearchBar from '../../components/search-bar.component';

const Search = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value)
  }

  return (
    <div>
      <h1>Lyric Library</h1>
      <SearchBar submitHandler={handleSubmit}/>
    </div>
  );
};

export default Search;
