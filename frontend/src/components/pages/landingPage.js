import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Footer from '../Footer';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

const LandingPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/art/artwork');
        // Shuffle artworks array
        const shuffledArtworks = response.data.sort(() => Math.random() - 0.5);
        setArtworks(shuffledArtworks);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, []);

  const handleOpenModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsZoomed(false);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
    setIsZoomed(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleDrag = (e, ui) => {
    // Handle dragging logic here
  };

  const handleResize = (e, { size }) => {
    // Handle resizing logic here
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
                    filter: 'brightness(100%)',
                    transition: 'filter 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.filter = 'brightness(80%)')}
                  onMouseLeave={(e) => (e.target.style.filter = 'brightness(100%)')}
                  onClick={() => handleOpenModal(pieceOfArtwork)}
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
      <Modal show={!!selectedArtwork} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedArtwork && selectedArtwork.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: '100%', height: isZoomed ? 'auto' : '80vh', textAlign: 'center' }}>
            <Draggable onDrag={handleDrag}>
              <ResizableBox
                width={500}
                height={300}
                minConstraints={[100, 100]}
                maxConstraints={[800, 800]}
                onResize={handleResize}
                draggableOpts={{ grid: [25, 25] }}
              >
                <img
                  src={selectedArtwork && selectedArtwork.imageURI}
                  alt={selectedArtwork && selectedArtwork.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </ResizableBox>
            </Draggable>
          </div>
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
