const express = require('express');
const router = express.Router();
const ArtWork = require('../models/artModel');

// POST route for creating artwork

router.post('/artwork', async (req, res) => {
  try {
    const { title, artistName, description, imageURI } = req.body;
    const newArtwork = new ArtWork({
      title,
      artistName,
      description,
      imageURI
    });
    await newArtwork.save();
    res.status(201).json(newArtwork);
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).send('An error occurred while creating the artwork.');
  }
});

module.exports = router;
