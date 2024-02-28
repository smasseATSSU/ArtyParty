import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Footer from '../Footer';

const LandingPage = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const response = await axios.get('http://localhost:8081/art/artwork');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    }
    fetchArtworks();
  }, []);

  return (
    <div style={{ backgroundColor: '#faca78', minHeight: '100vh' }}>
      <div style={{ height: '20px', backgroundColor: '#faca78' }}></div>
      <Container>
        <Row className="justify-content-center">
          {artworks.map((pieceOfArtwork) => (
            <Col key={pieceOfArtwork._id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={pieceOfArtwork.imageURI} />
                <Card.Body>
                  <h5 style={{ marginBottom: '10px' }}>
                    {/* Render the title without the Link */}
                    {pieceOfArtwork.title}
                  </h5>
                  <Card.Text>
                    {/* Make only the artist name a Link */}
                    Artist: <Link
                      to={`/artist/${pieceOfArtwork.artistId}`}
                      style={{ color: '#000', textDecoration: 'none', transition: 'text-decoration 0.3s' }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      {pieceOfArtwork.artistName}
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default LandingPage;
