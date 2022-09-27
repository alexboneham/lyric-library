import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e) => {
    let newVal = e.target.value;
    setSearchQuery(newVal);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchQuery}`)
    setSearchQuery('');
  }

  return (
    <div className="search-container" onSubmit={submitHandler}>
      <form className="search-form">
        <input placeholder="Search for song lyrics!" className="input" required value={searchQuery} onChange={changeHandler}/>
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default SearchBar;
