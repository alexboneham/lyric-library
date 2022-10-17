import { useState, useEffect, useContext } from 'react';

import { LibraryContext } from '../contexts/library.context';

import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import SearchBar from '../components/search-bar.component';
import SongCard from '../components/song-card.component';

import RecordsImage from '../assets/images/recordsOld.jpg';

const Libary = () => {
  const { librarySongs } = useContext(LibraryContext);

  const [searchValue, setSearchValue] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(librarySongs);

  useEffect(() => {
    const newFilteredSongs = librarySongs.filter((song) => {
      return song.title.toLowerCase().includes(searchValue) || song.artist.toLowerCase().includes(searchValue);
    });
    setFilteredSongs(newFilteredSongs);
  }, [searchValue, librarySongs]);

  const changeHandler = (e) => setSearchValue(e.target.value.toLowerCase());

  const imageStyles = { width: '100%', height: '20rem', padding: 0, objectFit: 'cover' };

  return (
    <Container fluid className='mb-5'>
      <Row>
        <Image src={RecordsImage} alt="record-stack" style={imageStyles} />
      </Row>

      <Row>
        <Col sm={6} md={4} className="mx-auto my-2 text-center">
          <Stack direction="vertical" gap={1}>
            <h1 className="display-5">Your Library</h1>
            <SearchBar handleChange={changeHandler} value={searchValue} placeholderValue="search library" />
          </Stack>
        </Col>
      </Row>

      {filteredSongs && (
        <Row xs={2} sm={3} md={4} lg={6} className="g-4 mx-3">
          {filteredSongs.map((song) => (
            <LinkContainer to={`/library/${song.id.toString()}`} key={song.id}>
              <Col>
                <SongCard song={song} />
              </Col>
            </LinkContainer>
          ))}
        </Row>
      )}

      <Row>
        {filteredSongs.length < 1 && (
          <Col className="text-center mt-2">
            <p>
              <span>This song is not in your library. Try </span>
              <span>
                <LinkContainer to={'/search'} style={{ cursor: 'pointer', color: 'blue' }}>
                  <span>searching</span>
                </LinkContainer>
              </span>
              <span> for it instead...</span>
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Libary;
