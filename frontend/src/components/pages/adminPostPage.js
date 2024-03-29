import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import { Container, Form, Button } from 'react-bootstrap';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    artistName: '',
    description: '',
    imageURI: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/art/artwork', formData);
      alert('Artwork record created successfully!');
      setFormData({ title: '', artistName: '', description: '', imageURI: '' }); // Reset form fields after successful submission
    } catch (error) {
      console.error('Error creating artwork:', error);
      alert('Error creating artwork. Please try again.');
    }
  };

  return (

    <Container>
      <h2 className="mt-5 mb-4">Create Artwork Record</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="artistName">
          <Form.Label>Artist Name:</Form.Label>
          <Form.Control type="text" name="artistName" value={formData.artistName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageURI">
          <Form.Label>Image URI:</Form.Label>
          <Form.Control type="text" name="imageURI" value={formData.imageURI} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Footer style={{ position: 'fixed', bottom: '0', width: '100%' }} />
    </Container>
   
  );
};

export default AdminPage;
