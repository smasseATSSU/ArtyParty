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
    <div className="d-flex flex-wrap justify-content-center">
      {artworks.map((pieceOfArtwork) => (
        <Card key={pieceOfArtwork._id} className="m-2" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pieceOfArtwork.imageURI} />
          <Card.Body>
            <Card.Title>{pieceOfArtwork.title}</Card.Title>
            <Card.Text>Artist: {pieceOfArtwork.artistName}</Card.Text>
           </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default LandingPage;
