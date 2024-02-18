import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';


export default function Navbar() {

  const linkStyle = {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginLeft: '20px',
    textDecoration: 'none', // Remove default underline
    transition: 'text-decoration 0.3s', // Smooth transition for underline
  };

  const hoverStyle = {
    textDecoration: 'underline', // Add underline on hover
  };

  return (
    <ReactNavbar style={{ backgroundColor: '#f57f5b' }} variant="dark">
      <Container>

        <Nav className="me-auto align-items-center">
          <Nav.Link className="nav-link" href="/start">
            <img 
              src="https://artypartybucket.s3.amazonaws.com/clickable+images/paint-palette.png" 
              alt="Start" 
              style={{ 
                width: '80px',
                height: '80px',
              }} 
            />
          </Nav.Link>

          <Nav.Link 
            className="nav-link" 
            style={linkStyle}
            href="/home" 
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} // Apply underline on hover
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'} // Remove underline on mouse leave
          >
            Home
          </Nav.Link>

          <Nav.Link 
            className="nav-link" 
            style={linkStyle}
            href="/landingpage" 
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Full Gallery
          </Nav.Link>
        
        </Nav>
        <Nav>
        <Nav.Link 
            className="nav-link" 
            style={linkStyle}
            href="/privateUserProfile" 
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Profile
          </Nav.Link>
          
          <Nav.Link 
            className="nav-link" 
            style={linkStyle}
            href="/login" 
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Login
          </Nav.Link>
          
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
