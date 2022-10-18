import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const SignUp = () => {
  const formControlBorderClasses = 'border-top-0 border-start-0 border-end-0 rounded-0';

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col sm={8} md={6} lg={5} className="mx-auto border rounded shadow-lg p-3">
          <div className="text-center mb-4">
            <h1 className="display-6">Create Account</h1>
            <p className="text-muted">Save songs to your library and create setlists.</p>
          </div>
          <Form className="px-5">
            <Stack gap={3}>
              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Control type="text" placeholder="Username" className={formControlBorderClasses} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control type="email" placeholder="Email address" className={formControlBorderClasses} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Control type="password" placeholder="Password" className={formControlBorderClasses} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Control type="password" placeholder="Confirm Password" className={formControlBorderClasses} />
              </Form.Group>
              <Button variant="success" type="submit" className="rounded-1">
                Sign Up
              </Button>
              <div>
                <p className="text-muted fs-6 text-center mt-1">
                  By clicking the Sign Up button, you agree to our <a href="#">Terms & Conditions</a>, and{' '}
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
