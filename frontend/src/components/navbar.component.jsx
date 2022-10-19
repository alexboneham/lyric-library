import { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavSearch from '../components/nav-search-bar.component';

import { UserContext } from '../contexts/user.context';

import { ReactComponent as Logo } from '../assets/logos/musical-note.svg';

function NavBar() {
  const { isAuthenticated, logoutUser } = useContext(UserContext);

  const handleLogout = () => logoutUser();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
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
          {isAuthenticated ? (
            <Nav className="me-1">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-1">
              <LinkContainer to={'/login'}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>

              <LinkContainer to={'/sign-up'}>
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
          <NavSearch />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
