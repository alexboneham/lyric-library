import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SearchBar from '../components/search-bar.component';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

const Search = () => {
  // State and Params for router
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State for search form
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [showArtistInput, setShowArtistInput] = useState(false);

  useEffect(() => {
    // Check for search parameters and prefill form
    if (searchParams.get('title')) {
      setTitle(searchParams.get('title'));
    }
    if (searchParams.get('artist')) {
      setArtist(searchParams.get('artist'));
    }
  }, [searchParams]);

  useEffect(() => {
    // Set the query state depending on current input states
    artist ? setQuery(`title=${title}&artist=${artist}`) : setQuery(`title=${title}`);
  }, [title, artist]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);
  const toggleArtistInput = () => (showArtistInput ? setShowArtistInput(false) : setShowArtistInput(true));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search', { state: { query: query } });
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center p-3" fluid>
        <h1 className="display-6 mt-2">Search for songs</h1>
        <Form onSubmit={handleSubmit} className="mt-2">
          <SearchBar handleChange={handleTitleChange} value={title} placeholderValue="song title" />
          {showArtistInput && (
            <SearchBar handleChange={handleArtistChange} value={artist} placeholderValue="artist name" />
          )}
        </Form>

        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => toggleArtistInput()}>
              {showArtistInput ? 'Search by title only' : 'include artist in search...'}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </>
  );
};

export default Search;

// {results.length > 0 && <SearchResults songs={results} />}
