import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './routes/layout/layout.component';
import Home from './routes/home/home.component';
import Library from './routes/library/library.component';
import Search from './routes/search/search.component';
import Setlists from './routes/setlists/setlists.component';


import SearchBox from './components/search-box/search-box.component';
import SongList from './components/song-list/song-list.component';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='library' element={<Library />} />
          <Route path='search' element={<Search />} />
          <Route path='setlists' element={<Setlists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
