import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {artworks.map((pieceOfArtwork) => (
          <div className="col-md-4 mb-4" key={pieceOfArtwork._id}>
            <Card className="h-100">
              <Card.Img variant="top" src={pieceOfArtwork.imageURI} />
              <Card.Body>
                <Card.Title>{pieceOfArtwork.title}</Card.Title>
                <Card.Text>Artist: {pieceOfArtwork.artistName}</Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
