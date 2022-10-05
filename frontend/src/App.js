import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './routes/layout/layout.component';
import Home from './routes/home/home.component';
import Library from './routes/library/library.component';
import LibraryItem from './routes/library-item/library-item.component';
import Setlists from './routes/setlists/setlists.component';
import Setlist from './routes/setlist/setlist.component';
import Search from './routes/search/search.component';
import SearchResult from './routes/search-result/search-result.component';

import { isResponseOk } from './utils/helper-functions';
import './App.scss';

const App = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000')
      .then((res) => isResponseOk(res))
      .then((data) => {
        document.title = data.app;
        setTitle(data.heading);
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage('API is not connected or configured properly')
        console.log(error)
      })
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title={title} message={message} />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:id" element={<SearchResult />} />
          <Route path="library" element={<Library />} />
          <Route path="library/:id" element={<LibraryItem />} />
          <Route path="setlists" element={<Setlists />} />
          <Route path="setlists/:id" element={<Setlist />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
