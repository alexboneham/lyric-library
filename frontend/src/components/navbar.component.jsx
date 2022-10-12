import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { LinkContainer } from 'react-router-bootstrap';

import { ReactComponent as ReactLogo } from '../assets/musical-note.svg';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand>
            <ReactLogo style={{ height: '50px', width: '50px' }} />
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
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-dark">Search</Button>
          </Form>
          <Nav className='ms-1'>
            <LinkContainer to={'/login'}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to={'/signup'}>
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
