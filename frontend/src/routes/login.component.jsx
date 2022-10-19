import { useState, useContext } from 'react';

import { UserContext } from '../contexts/user.context';
import { isResponseOk } from '../utils/helper-functions';

// Bootstrap components
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  // const [error, setError] = useState('');

  const { csrfToken, isAuthenticated, setIsAuthenticated } = useContext(UserContext);

  const formControlBorderClasses = 'border-top-0 border-start-0 border-end-0 rounded-0';
  const linkStyles = { textDecoration: 'underline', color: '#0D6EFD', cursor: 'pointer' };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      console.log('User is already authenticated');
      setShowAlert(true);
      return;
    }

    // Make call to Django backend to log user in
    console.log('User login function running...');
    console.log(`CSRF token to be used: ${csrfToken}`);

    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        if (data.success) {
          console.log(data.success);
          setIsAuthenticated(true);
        } else if (data.error) {
          console.log(data.error);
        } else {
          console.log('Something else went wrong!');
        }
      })
      .catch((e) => console.log(e));

    setUsername('');
    setPassword('');
  };

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col sm={8} md={6} lg={5} className="mx-auto border rounded shadow-lg p-3">
          <div className="text-center mb-4">
            <h1 className="display-6">Login</h1>
          </div>
          <Form className="px-5" onSubmit={handleFormSubmit}>
            <Stack gap={3}>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={formControlBorderClasses}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={formControlBorderClasses}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="rounded-1">
                Login
              </Button>
              {showAlert && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                  User is already logged in.
                </Alert>
              )}
              <div>
                <p className="text-muted fs-6 text-center mt-1">
                  Don't have an account? Click{' '}
                  <LinkContainer to={'/sign-up'} style={linkStyles}>
                    <span>here</span>
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
