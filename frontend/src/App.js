import { useContext } from 'react';
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

import './App.scss';

const App = () => {
  const { isAuthenticated } = useContext(UserContext);

  document.title = 'lyric-library';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="search/:id" element={<SearchResult />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />

          <Route path="library" element={isAuthenticated ? <Library /> : <Login />} />
          <Route path="library/:id" element={isAuthenticated ? <LibraryItem /> : <Login />} />
          <Route path="setlists" element={isAuthenticated ? <Setlists /> : <Login />}>
            <Route path=":id" element={<Setlist />} />
          </Route>
          <Route path="new-song" element={isAuthenticated ? <NewSong /> : <Login />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
