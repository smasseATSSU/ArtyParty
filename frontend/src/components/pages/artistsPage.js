import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Footer from '../Footer';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await axios.get('http://localhost:8081/artists/artists');
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    }
    fetchArtists();
  }, []);

  const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    transition: 'text-decoration 0.3s',
  };

  const hoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <div style={{ backgroundColor: '#faca78', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <Row className="justify-content-center">
          {artists.map((artist) => (
            <Col key={artist._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <div
                  style={{
                    height: '200px',
                    backgroundImage: `url('${artist.imageURI}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <Card.Body>
                  <Card.Title>{artist.artistName}</Card.Title>
                  <Card.Title>{artist.typeOfArt}</Card.Title>
                  <Link
                    to={`/artist/${artist._id}`}
                    style={linkStyle}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  >
                    <Button variant="primary" style={{ backgroundColor: '#f57f5b', borderColor: '#ffc7a1', borderRadius: '3px', padding: '10px 30px', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none' }}>View Artist</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ height: '1in' }}></div>

      </Container>
      <Footer style={{ backgroundColor: '#f8f9fa', padding: '20px' }} />
    </div>
  );
};

export default ArtistsPage;
