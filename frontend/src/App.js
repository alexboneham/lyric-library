import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, json } from 'react-router-dom';

import Layout from './routes/layout/layout.component';
import Home from './routes/home/home.component';
import Library from './routes/library/library.component';
import Setlists from './routes/setlists/setlists.component';
import SearchRouter from './routes/search-router/search-router.component';

import './App.scss';

const App = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000')
      .then((res) => res.json())
      .then((data) => {
        document.title = data.app;
        setTitle(data.heading);
        setMessage(data.message);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title={title} message={message}/>} />
          <Route path="search/*" element={<SearchRouter />} />
          <Route path="library" element={<Library />} />
          <Route path="setlists" element={<Setlists />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
