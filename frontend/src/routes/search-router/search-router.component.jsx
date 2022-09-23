import { Routes, Route } from 'react-router-dom';

import Search from '../search/search.component';
import SearchResult from '../search-result/search-result.component';

const SearchRouter = () => (
  <Routes>
    <Route index element={<Search />} />
    <Route path=":id" element={<SearchResult />} />
  </Routes>
);

export default SearchRouter;
