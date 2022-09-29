import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './routes/layout/layout.component';
import Home from './routes/home/home.component';
import Library from './routes/library/library.component';
import LibraryItem from './routes/library-item/library-item.component';
import Setlists from './routes/setlists/setlists.component';
import Search from './routes/search/search.component';
import SearchResult from './routes/search-result/search-result.component';

import { isResponseOk } from './utils/helper-functions';
import './App.scss';

const App = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [librarySongs, setLibrarySongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000')
      .then((res) => res.json())
      .then((data) => {
        document.title = data.app;
        setTitle(data.heading);
        setMessage(data.message);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/library')
      .then((res) => isResponseOk(res))
      .then((data) => {
        setLibrarySongs(data.songs);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title={title} message={message} />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:id" element={<SearchResult librarySongs={librarySongs}/>} />
          <Route path="library" element={<Library librarySongs={librarySongs}/>} />
          <Route path="library/:id" element={<LibraryItem />} />
          <Route path="setlists" element={<Setlists />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
