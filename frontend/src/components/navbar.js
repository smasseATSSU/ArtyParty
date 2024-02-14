import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled: 
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar style={{ backgroundColor: '#ffc7a1' }} variant="dark">
      <Container>
        <Nav className="me-auto">
        <Nav.Link style={{ color: '#3b719f' }} href="/start">Start </Nav.Link>
        <Nav.Link style={{ color: '#3b719f' }} href="/landingPage">Full Gallery</Nav.Link>
          <Nav.Link style={{ color: '#3b719f' }} href="/home">Home</Nav.Link>
          <Nav.Link style={{ color: '#3b719f' }} href="/privateUserProfile">Profile</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link style={{ color: '#3b719f' }} href="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
