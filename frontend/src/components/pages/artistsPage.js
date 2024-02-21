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
                    backgroundImage: `url('https://artypartybucket.s3.amazonaws.com/gallery.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <Card.Body>
                  <Card.Title>{artist.artistName}</Card.Title>
                  <Card.Text>{artist.biography}</Card.Text>
                  <Link to={`/artist/${artist._id}`}>
                    <Button variant="primary">View Artist</Button>
                  </Link>
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

export default ArtistsPage;
