import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const Login = () => {
  const formControlBorderClasses = 'border-top-0 border-start-0 border-end-0 rounded-0';

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col sm={8} md={6} lg={5} className="mx-auto border rounded shadow-lg p-3">
          <div className="text-center mb-4">
            <h1 className="display-6">Login</h1>
          </div>
          <Form className="px-5">
            <Stack gap={3}>
              <Form.Group controlId="formUsername">
                <Form.Control type="text" placeholder="Username" className={formControlBorderClasses} required />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Control type="password" placeholder="Password" className={formControlBorderClasses} required />
              </Form.Group>
              <Button variant="success" type="submit" className="rounded-1">
                Login
              </Button>
              <div>
                <p className="text-muted fs-6 text-center mt-1">
                  Don't have an account? Click{' '}
                  <LinkContainer to={'/sign-up'}>
                    <a>here</a>
                  </LinkContainer>{' '}
                  to sign up.
                </p>
              </div>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
