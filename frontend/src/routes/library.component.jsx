import { useState, useEffect, useContext } from 'react';

import { LibraryContext } from '../contexts/library.context';

import LibraryList from '../components/library-list/library-list.component';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import SearchBar from '../components/search-bar.component';
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

  const imageStyles = { width: '100%', height: '20rem', padding: 0, objectFit: 'cover'}

  return (
    <Container fluid>
      <Row><Image src={RecordsImage}  alt='record-stack' style={imageStyles} /></Row>
      <Row>
        <Col md={4} className="mx-auto my-2 text-center">
          <Stack direction="vertical" gap={1}>
            <h1 className="display-5">Your Library</h1>
            <SearchBar handleChange={changeHandler} value={searchValue} placeholderValue="search library" />
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          {filteredSongs.map((song) => <div key={song.id}>{song.title}</div>)}
        </Col>
      </Row>
    </Container>
  );
};

export default Libary;
