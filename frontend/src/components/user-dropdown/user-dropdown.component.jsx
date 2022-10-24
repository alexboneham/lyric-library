import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import './user-dropdown.styles.scss';

const UserDropdown = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <Container className="user_dropdown">
      <Nav className="flex-column">
        <Nav.Link>
          <b>{user.username}</b>
        </Nav.Link>
        <LinkContainer to={`/profile/${user.id}`}>
          <Nav.Link>Edit profile</Nav.Link>
        </LinkContainer>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </Container>
  );
};

export default UserDropdown;
