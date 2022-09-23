const SearchBar = ({ submitHandler }) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input name="query" />
      </form>
    </div>
  );
};

export default SearchBar;
