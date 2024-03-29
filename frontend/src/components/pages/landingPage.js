import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'; // Import Modal component
import Button from 'react-bootstrap/Button'; // Import Button component
import axios from 'axios';
import Footer from '../Footer';

const LandingPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null); // State to store the selected artwork
  const [isZoomed, setIsZoomed] = useState(false); // State to track zoom status

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/art/artwork');
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, []);

  // Function to handle opening the modal
  const handleOpenModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsZoomed(false); // Reset zoom status when opening modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedArtwork(null);
    setIsZoomed(false); // Reset zoom status when closing modal
  };

  // Function to handle toggling zoom
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div style={{ backgroundColor: '#faca78', minHeight: '100vh' }}>
      <div style={{ height: '20px', backgroundColor: '#faca78' }}></div>
      <Container>
        <Row>
          {artworks.map((pieceOfArtwork) => (
            <Col key={pieceOfArtwork._id} xs={12} sm={6} md={4} lg={3} xl={3} className="mb-4">
              <Card style={{ width: '100%' }}>
                <div
                  style={{
                    height: '250px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    filter: 'brightness(100%)', // Default brightness
                    transition: 'filter 0.3s', // Smooth transition
                  }}
                  onMouseEnter={(e) => (e.target.style.filter = 'brightness(80%)')} // Darken on hover
                  onMouseLeave={(e) => (e.target.style.filter = 'brightness(100%)')} // Restore brightness on hover out
                  onClick={() => handleOpenModal(pieceOfArtwork)} // Open modal on click
                >
                  <Card.Img
                    variant="top"
                    src={pieceOfArtwork.imageURI}
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body>
                  <h5 style={{ marginBottom: '10px' }}>{pieceOfArtwork.title}</h5>
                  <Card.Text>
                    Artist:{' '}
                    <Link
                      to={`/artist/${pieceOfArtwork.artistId}`}
                      style={{
                        color: '#000',
                        textDecoration: 'none',
                        transition: 'text-decoration 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
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
      {/* Modal for displaying the selected artwork */}
      <Modal show={!!selectedArtwork} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedArtwork && selectedArtwork.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedArtwork && selectedArtwork.imageURI}
            alt={selectedArtwork && selectedArtwork.title}
            style={{ width: '100%', height: isZoomed ? 'auto' : '80vh' }} // Set height based on zoom status
          />
        </Modal.Body>
        <Modal.Footer>
           <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LandingPage;
