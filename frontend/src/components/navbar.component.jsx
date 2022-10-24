import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserDropdown from './user-dropdown/user-dropdown.component';
import UserIcon from './user-icon.component';

// Bootstrap components
import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavSearch from '../components/nav-search-bar.component';

import { UserContext } from '../contexts/user.context';

import { ReactComponent as Logo } from '../assets/logos/musical-note.svg';

function NavBar() {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { isAuthenticated, user } = useContext(UserContext);

  let location = useLocation()

  useEffect(() => {
    // Make sure dropdown is closed when redirecting
    setShowUserDropdown(false);
  }, [location]);

  const handleUserClick = () => setShowUserDropdown(showUserDropdown ? false : true);

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
            <div className="me-4">
              <NavSearch />
            </div>
            {isAuthenticated ? (
              <>
                <Nav.Link onClick={handleUserClick}>{user.username}</Nav.Link>
                
                <Nav.Link className="p-0" onClick={handleUserClick}>
                  <UserIcon />
                </Nav.Link>
                {showUserDropdown && <UserDropdown />}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
