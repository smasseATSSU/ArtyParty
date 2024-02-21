import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
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
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Discover a world of creativity and inspiration.</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>Join us in celebrating the diverse talents of our community.</p>
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
              {/* Add featured artworks here */}
            </div>
          </Col>
          <Col md={6}>
            <div className="upcoming-events">
              <h2 className="text-center">Upcoming Events</h2>
              {/* Add upcoming events here */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
