import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ErrorLoad = ({ id }) => {
  
  return (
    <Container fluid>
      <Container className="d-flex flex-column align-items-center mt-5">
        <div className="text-center">
          <h1 className="display-1">Error</h1>
          <p>Sorry! Something went wrong on our end.</p>
          <Button variant="outline-warning" className="rounded-pill" href={`/search/${id}`}>
            Try again
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default ErrorLoad;
