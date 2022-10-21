import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Bootstrap components
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavSearch from '../components/nav-search-bar.component';

import { UserContext } from '../contexts/user.context';

import { ReactComponent as Logo } from '../assets/logos/musical-note.svg';

function NavBar() {
  const { isAuthenticated, logoutUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="mx-3">
        <LinkContainer to={'/'}>
          <Navbar.Brand>
            <Logo style={{ height: '50px', width: '50px' }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated && (
            <Nav className="me-auto" defaultActiveKey={null}>
              <LinkContainer to={'/library'}>
                <Nav.Link>Library</Nav.Link>
              </LinkContainer>
              <LinkContainer to={'/setlists'}>
                <Nav.Link>Setlists</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Navbar.Text>{user.username}</Navbar.Text>
                <div className='vr ms-2' ></div>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to={'/login'}>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to={'/sign-up'}>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <NavSearch />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
