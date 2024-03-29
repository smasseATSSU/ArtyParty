import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Footer from '../Footer';
import axios from 'axios';

const HomePage = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [landingArtworks, setLandingArtworks] = useState([]);

  useEffect(() => {
    async function fetchFeaturedArtworks() {
      try {
        const response = await axios.get('http://localhost:8081/art/featured');
        setFeaturedArtworks(response.data);
      } catch (error) {
        console.error('Error fetching featured artworks:', error);
      }
    }
    fetchFeaturedArtworks();
  }, []);

  useEffect(() => {
    async function fetchLandingArtworks() {
      try {
        const response = await axios.get('http://localhost:8081/art/artwork');
        setLandingArtworks(response.data);
      } catch (error) {
        console.error('Error fetching landing artworks:', error);
      }
    }
    fetchLandingArtworks();
  }, []);

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the landing artworks
  const shuffledLandingArtworks = shuffleArray(landingArtworks);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Times New Roman' }}> {/* Set font family to Times New Roman */}
      {/* Title Bar */}
      <div
        style={{
          position: 'relative',
          backgroundImage: `url('https://artypartybucket.s3.amazonaws.com/gallery.jpg')`, // Replace with your S3 image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px', // Adjust height as needed
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {/* Shadow Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
          }}
        ></div>

        <h1
          style={{
            position: 'relative',
            fontSize: '3.5rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Welcome to ArtyParty!
        </h1>
      </div>

      <Container>
        <Row className="mt-5 justify-content-center">
          <Col md={8} className="text-center">
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Join the Salem State community in appreciating the arts</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>Discover the "Salem State Difference"</p>
            <Link to="/landingPage">
              <Button
                variant="primary"
                size="lg"
                style={{
                  backgroundColor: '#f57f5b',
                  borderColor: '#ffc7a1',
                  color: '#fff',
                  borderRadius: '3',
                  padding: '10px 30px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                Explore Gallery
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col md={6}>
            <div className="featured-section">
              <h2 className="text-center">Featured Artworks</h2>
              {featuredArtworks.map((artwork) => (
                <div key={artwork._id}>
                  <h3>{artwork.title}</h3>
                  <img src={artwork.imageURI} alt={artwork.title} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                  <p>{artwork.artistName}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        {/* Display three shuffled artworks from landing page */}
        <Row className="mt-5 justify-content-center">
          {shuffledLandingArtworks.slice(0, 3).map((artwork) => (
            <Col key={artwork._id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
              <div>
                <h3>{artwork.title}</h3>
                <img src={artwork.imageURI} alt={artwork.title} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                <p>{artwork.artistName}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
