import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const TokenTest = () => {
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

  const makeFetch = (method) => {
    fetch('http://localhost:8000/ping', {
      method: method,
      headers:
        method === 'POST'
          ? {
              'X-CSRFToken': csrfToken,
            }
          : {},
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => console.log(data.result));
  };

  return (
    <Container className="mt-5">
      <Button className="me-1" onClick={() => makeFetch('GET')}>
        Test GET request
      </Button>
      <Button onClick={() => makeFetch('POST')}>
        Test POST request
      </Button>
    </Container>
  );
};

export default TokenTest;
