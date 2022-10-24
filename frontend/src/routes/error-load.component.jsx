import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

const ErrorLoad = ({id}) => {
  return (
    <Container fluid>
      <Container className="d-flex flex-column align-items-center mt-5">
        <div className="text-center">
          <h1 className="display-1">Error</h1>
          <p>Sorry! Something went wrong on our end.</p>
          <LinkContainer to={`/search/${id}`}>
            <Button variant='outline-warning' className='rounded-pill'>Try again</Button>
          </LinkContainer>
        </div>
      </Container>
    </Container>
  );
};

export default ErrorLoad;