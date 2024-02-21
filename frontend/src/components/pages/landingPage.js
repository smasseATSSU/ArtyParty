import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Footer from '../Footer';

const LandingPage = () => {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

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
    <Container >
      <Row className="justify-content-center">
        
        {artworks.map((pieceOfArtwork) => (
          <Col key={pieceOfArtwork._id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
            <Card style={{ width: '100%' }}>
              <Card.Img variant="top" src={pieceOfArtwork.imageURI} />
              <Card.Body>
                <Card.Title>{pieceOfArtwork.title}</Card.Title>
                <Card.Text>Artist: {pieceOfArtwork.artistName}</Card.Text>
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
