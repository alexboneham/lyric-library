import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/user.context';

import { useParams } from 'react-router-dom';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Profile = () => {
  const { user, csrfToken, setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { userId } = useParams();

  useEffect(() => {
    if (user.id) {
      setUsername(user.username);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const profile_data = {
      username,
      email,
      firstName,
      lastName,
    };
    fetch(`http://localhost:8000/profile/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify(profile_data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.detail);
        // Update user state
        setUser(data.user);
      });
  };

  return (
    <Container fluid>
      <Row className="pt-4">
        <Col sm={11} md={10} lg={7} className="mx-auto border rounded shadow-lg p-3">
          <div className="text-center mb-4">
            <h1 className="display-6">Profile</h1>
            <p className="text-muted">Edit your personal details</p>
          </div>
          <Form className="px-3" onSubmit={handleFormSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formGridUsername">
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGridFirstName">
              <Form.Label column sm="2">
                First name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGridLastName">
              <Form.Label column sm="2">
                Last name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Last name" value={lastName} onChange={handleLastNameChange} />
              </Col>
            </Form.Group>
            <Form.Text muted className="d-flex justify-content-center">
              Last login: {user.lastLogin}
            </Form.Text>
            <div className="d-grid">
              <Button type="submit" variant="primary" size="lg" className="mt-2 mx-5">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
