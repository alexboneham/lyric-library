import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import SongList from './components/song-list/song-list.component';

import './App.css';

function App() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/library")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  }, [])

  return (
    <div className="App">
      <h1 className="app-title">Lyric Library Frontend</h1>
      <SearchBox />
      <SongList />
    </div>
  );
}

export default App;
