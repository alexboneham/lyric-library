import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LinkContainer } from 'react-router-bootstrap';

import logo from '../assets/logo.png';
import {ReactComponent as ReactLogo} from '../assets/musical-note.svg';

function SimpleNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand>
            <ReactLogo style={{height: '50px', width: '50px'}}/>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={'/library'}>
              <Nav.Link>Library</Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/search'}>
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/setlists'}>
              <Nav.Link href="/setlists">Setlists</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SimpleNav;
