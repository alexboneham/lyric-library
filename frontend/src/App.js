import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import SongList from './components/song-list/song-list.component';

import './App.css';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/library")
    .then((res) => res.json())
    .then((data) => {
      if (data.error){
        return console.log(data.error)
      }
      setSongs(data.songs)
    })
  }, [])


  const buttonSubmitHandler = () => {

    const queryString = `q=`

    fetch(`http://localhost:8000/search?${queryString}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error){
        console.log(data.error)
      }
      else {
        console.log(data)
      }
    })
    return
  }

  return (
    <div className="App">
      <h1 className="app-title">Lyric Library</h1>
      <SearchBox onSubmitHandler={buttonSubmitHandler}/>
      <SongList songs={songs} />
    </div>
  );
}

export default App;
