import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/user.context';
import { isResponseOk } from '../utils/helper-functions';

// Style components
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { csrfToken } = useContext(UserContext);

  const navigate = useNavigate();

  const formControlBorderClasses = 'border-top-0 border-start-0 border-end-0 rounded-0';
  const linkStyles = { textDecoration: 'underline', color: '#0D6EFD', cursor: 'pointer' };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmationChange = (e) => setConfirmation(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmation) {
      console.log('Passwords must match');
      setShowAlert(true);
      return;
    }

    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmation: confirmation,
      }),
    })
      .then((res) => isResponseOk(res))
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else if (data.success) {
          console.log(data.success);
          // update user context
          navigate('/library');
        } else {
          console.log('some other issue');
        }
      });
  };

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col sm={8} md={6} lg={5} className="mx-auto border rounded shadow-lg p-3">
          <div className="text-center mb-4">
            <h1 className="display-6">Create Account</h1>
            <p className="text-muted">Save songs to your library and create setlists.</p>
          </div>
          <Form className="px-5" onSubmit={handleFormSubmit}>
            <Stack gap={3}>
              <Form.Group controlId="formGridUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className={formControlBorderClasses}
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className={formControlBorderClasses}
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className={formControlBorderClasses}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridConfirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className={formControlBorderClasses}
                  value={confirmation}
                  onChange={handleConfirmationChange}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="rounded-1">
                Sign Up
              </Button>
              {showAlert && (
                <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                  Passwords must match
                </Alert>
              )}

              <div>
                <p className="text-muted fs-6 text-center mt-1">
                  By clicking the Sign Up button, you agree to our{' '}
                  <LinkContainer to={'#'} style={linkStyles}>
                    <span>Terms & Conditions</span>
                  </LinkContainer>
                  , and{' '}
                  <LinkContainer to={'#'} style={linkStyles}>
                    <span>Privacy Policy</span>
                  </LinkContainer>
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
