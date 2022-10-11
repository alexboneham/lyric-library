import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Home = ({ title, message }) => {
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/csrf', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setCsrfToken(data.csrfToken);
      });
  }, []);

  const handleGet = () => {
    fetch('http://localhost:8000/ping', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data.result));
  };

  const handlePost = () => {
    fetch('http://localhost:8000/ping', {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data.result));
  };

  return (
    <Container className="p-3 text-center shadow-lg rounded">
      <h1 className="display-4">{title}</h1>
      <p>{message}</p>
      <hr />
      <h2>Usage:</h2>
      <Container className="w-50">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Link to={'/search'}>Search</Link> for a song by title or artist
          </ListGroup.Item>
          <ListGroup.Item>
            Save a song to your <Link to={'/library'}>Library</Link> for fast access and more features
          </ListGroup.Item>
          <ListGroup.Item>
            Create <Link to={'/setlists'}>Setlists</Link> and add songs
          </ListGroup.Item>
        </ListGroup>
      </Container>
      <Container className='mt-5'>
        <Button className="me-1" onClick={handleGet}>
          Test GET request
        </Button>
        <Button className="" onClick={handlePost}>
          Test POST request
        </Button>
      </Container>
    </Container>
  );
};

export default Home;
