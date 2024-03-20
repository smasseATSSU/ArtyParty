// AdminPage.js
import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post('http://localhost:8081/artwork', formData);
      alert('Artwork record created successfully!');
      setFormData({ title: '', artistName: '', description: '', imageURI: '' }); // Reset form fields after successful submission
    } catch (error) {
      console.error('Error creating artwork:', error);
      alert('Error creating artwork. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Artwork Record</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
        <label>Artist Name:</label>
        <input type="text" name="artistName" value={formData.artistName} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        <label>Image URI:</label>
        <input type="text" name="imageURI" value={formData.imageURI} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;
