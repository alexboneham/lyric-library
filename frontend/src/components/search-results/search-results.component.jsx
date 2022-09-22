const SearchResults = ({ hits }) => {
  return hits.map((hit) => {
    return <div key={hit.result.id}>{hit.result.full_title}</div>;
  });
};

export default SearchResults;
