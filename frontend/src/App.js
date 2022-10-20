import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserContext } from './contexts/user.context';

import Layout from './routes/layout.component';
import Home from './routes/home.component';

import Library from './routes/library.component';
import LibraryItem from './routes/library-item.component';
import Setlists from './routes/setlists.component';
import Setlist from './routes/setlist.component';
import SearchResults from './routes/search-results.component';
import SearchResult from './routes/search-result.component';
import NewSong from './routes/new-song.component';
import Login from './routes/login.component';
import SignUp from './routes/sign-up.component';
import NotFound from './routes/not-found.component';

import { isResponseOk } from './utils/helper-functions';
import './App.scss';

const App = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:8000')
      .then((res) => isResponseOk(res))
      .then((data) => {
        document.title = data.app;
        setTitle(data.heading);
        setMessage(data.message);
      })
      .catch((error) => {
        setMessage('API is not connected or configured properly');
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home title={title} message={message} />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="search/:id" element={<SearchResult />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          {isAuthenticated && (
            <>
              <Route path="library" element={<Library />} />
              <Route path="library/:id" element={<LibraryItem />} />
              <Route path="setlists" element={<Setlists />}>
                <Route path=":id" element={<Setlist />} />
              </Route>
              <Route path="new-song" element={<NewSong />} />
            </>
          )}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
