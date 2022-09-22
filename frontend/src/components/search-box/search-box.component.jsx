import './search-box.styles.scss';

const SearchBox = (props) => {
  const { handleChange, handleSubmit, value, placeholder, label } = props;
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <label>{label}</label>
        <input placeholder={placeholder} type="search" name="q" value={value} required onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBox;
