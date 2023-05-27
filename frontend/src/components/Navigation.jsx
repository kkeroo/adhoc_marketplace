import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Container>
    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Link to='/'><Navbar.Brand>adhok</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to='/listings' className='nav-link' style={{ textDecoration: 'none' }}>My Listings</Link>
            <Link to='/items' className='nav-link' style={{ textDecoration: 'none' }}>My Items</Link>
            <Nav.Link href="/profile">Jasa K.</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Container>
  );
}

export default Navigation;