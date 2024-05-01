import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import { Container, Form, Button, Modal, Row, Col } from 'react-bootstrap';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    artistId: '',
    artistName: '', 
    description: '',
    imageURI: '',
    artType: ''
  });

  const [artists, setArtists] = useState([]);
  const [showCreateArtistModal, setShowCreateArtistModal] = useState(false);
  const [newArtistName, setNewArtistName] = useState('');
  const [newTown, setNewTown] = useState('');
  const [newbiography, setNewbiography] = useState('');
  const [newimageURI, setNewimageURI] = useState('');
  const [newtypeOfArt, setNewtypeOfArt] = useState('');

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch artist's name based on selected artistId
      const selectedArtist = artists.find(artist => artist._id === formData.artistId);
      const artistName = selectedArtist ? selectedArtist.artistName : '';
      
      // Include artistName in formData
      const updatedFormData = { ...formData, artistName };
      
      await axios.post('http://localhost:8081/art/artwork', updatedFormData);
      alert('Artwork record created successfully!');
      setFormData({ title: '', artistId: '', artistName: '', description: '', imageURI: '', artType: '' }); 
    } catch (error) {
      console.error('Error creating artwork:', error);
      alert('Error creating artwork. Please try again.');
    }
  };

  const handleCreateArtist = async () => {
    try {
      const response = await axios.post('http://localhost:8081/artists/artists', {
        artistName: newArtistName,
        Town: newTown,
        biography: newbiography,
        imageURI: newimageURI,
        typeOfArt: newtypeOfArt
      });
      setArtists([...artists, response.data]);
      setFormData({ ...formData, artistId: response.data._id });
      setShowCreateArtistModal(false);
      setNewArtistName('');
      setNewTown('');
      setNewbiography('');
      setNewimageURI('');
      setNewtypeOfArt('');
    } catch (error) {
      console.error('Error creating artist:', error);
      alert('Error creating artist. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#faca78'}}>
         <h1> &nbsp;</h1>      <Container>
        <Row className="mt-5">
          <Col md={6} className="mb-4">
            <h2>Create Artwork Record</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="title">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="artistId">
                <Form.Label>Artist Name:</Form.Label>
                <Form.Control as="select" name="artistId" value={formData.artistId} onChange={handleChange}>
                  <option value="">Select an artist...</option>
                  {artists.map((artist) => (
                    <option key={artist._id} value={artist._id}>{artist.artistName}</option>
                  ))}
                </Form.Control>
                <Button variant="link" className="mt-3" onClick={() => setShowCreateArtistModal(true)}>Create New Artist</Button>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="artType">
                <Form.Label>Art Type:</Form.Label>
                <Form.Control type="text" name="artType" value={formData.artType} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="imageURI">
                <Form.Label>Image URI:</Form.Label>
                <Form.Control type="text" name="imageURI" value={formData.imageURI} onChange={handleChange} />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={showCreateArtistModal} onHide={() => setShowCreateArtistModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newArtistName">
            <Form.Label>Artist Name:</Form.Label>
            <Form.Control type="text" value={newArtistName} onChange={(e) => setNewArtistName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="newTown">
            <Form.Label>Town:</Form.Label>
            <Form.Control type="text" value={newTown} onChange={(e) => setNewTown(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="newbiography">
            <Form.Label>Biography:</Form.Label>
            <Form.Control type="text" value={newbiography} onChange={(e) => setNewbiography(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="newimageURI">
            <Form.Label>Image URI:</Form.Label>
            <Form.Control type="text" value={newimageURI} onChange={(e) => setNewimageURI(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="newtypeOfArt">
            <Form.Label>Type of Art:</Form.Label>
            <Form.Control type="text" value={newtypeOfArt} onChange={(e) => setNewtypeOfArt(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateArtistModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateArtist}>Create</Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default AdminPage;
