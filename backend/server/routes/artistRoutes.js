const express = require('express');
const router = express.Router();
const artworkModel = require('../models/artistModel'); // Assuming artModel is defined in a separate file

// CREATE - Create a new artwork
router.post('/artist', async (req, res) => {
  try {
    const artist = await artistModel.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all artworks
router.get('/artist', async (req, res) => {
  try {
    const artworks = await artistModel.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get a specific artwork
router.get('/artist/:id', getArtist, (req, res) => {
  res.json(res.artists);
});

// UPDATE - Update a specific artwork
router.put('/artist/:id', getArtist, async (req, res) => {
  if (req.body.artistName != null) {
    res.artist.artistName = req.body.artistName;
  }
  if (req.body.town != null) {
    res.artist.town = req.body.town;
  }
  if (req.body.biography != null) {
    res.artist.biography = req.body.biography;
  }
  try {
    const updatedArtist = await res.artist.save();
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a specific artwork
router.delete('/artist/:id', getArtist, async (req, res) => {
  try {
    await res.artist.remove();
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getArtist(req, res, next) {
  try {
    const artist = await artistModel.findById(req.params.id);
    if (artist == null) {
      return res.status(404).json({ message: 'Cannot find artist' });
    }
    res.artist = artist;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
