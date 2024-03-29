import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';


export default function Navbar() {

  const linkStyle = {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'normal', // Changed font weight to normal for a thinner font
    fontFamily: 'Times New Roman', // Changed font family to Times New Roman
    marginLeft: '20px',
    textDecoration: 'none', // Remove default underline
    transition: 'text-decoration 0.3s', // Smooth transition for underline
  };

  return (
    <ReactNavbar style={{ backgroundColor: '#f57f5b', paddingBottom: '5px', paddingTop: '5px', height: '50px' }} variant="dark">
      <Container>

        <Nav className="me-auto align-items-center">
          <Nav.Link className="nav-link" href="/home">
            <img 
              src="https://artypartybucket.s3.amazonaws.com/clickable+images/paint-palette.png" 
              alt="Start" 
              style={{ 
                width: '58px',
                height: '58px',
              }} 
            />
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

          <Nav.Link 
            className="nav-link" 
            style={linkStyle}
            href="/adminPostPage" 
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Post
          </Nav.Link>

          <Nav.Link 
            className="nav-link" 
            style={linkStyle}
            href="/artistsPage" 
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Meet the Artists 
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
