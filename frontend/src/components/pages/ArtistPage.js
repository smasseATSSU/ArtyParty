import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const ArtistPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    async function fetchArtist() {
      try {
        const response = await axios.get(`http://localhost:8081/artists/artist/${artistId}`);
        setArtist(response.data);
      } catch (error) {
        console.error('Error fetching artist data:', error);
      }
    }
    fetchArtist();
  }, [artistId]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: '#faca78', minHeight: '100vh', padding: '20px' }}>
      <Container>
        <Row>
          <Col>
            <Card bg='#68c7c1' text="#794a3a" className="text-center p-3 mb-5">
              <Card.Title as="h1">{artist.artistName}</Card.Title>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={artist.imageURI} />
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Biography</Card.Title>
                <Card.Text>{artist.biography}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Details</Card.Title>
                <Card.Text>
                  <p><strong>Town:</strong> {artist.Town}</p>
                  <p><strong>Type of Art:</strong> {artist.typeOfArt}</p>
                  {/* Add additional artist details here */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ArtistPage;
