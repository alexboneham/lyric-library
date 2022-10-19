import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = () => {
  return (
    <Container fluid>
      <Container className="d-flex flex-column align-items-center mt-5">
        <div className="text-center">
          <h1 className="display-1">404</h1>
          <p>Oops! That page couldn't be found.</p>
          <LinkContainer to={'/'}>
            <Button variant='outline-success' size='lg' className='rounded-pill'>Go to Home</Button>
          </LinkContainer>
        </div>
      </Container>
    </Container>
  );
};

export default NotFound;
