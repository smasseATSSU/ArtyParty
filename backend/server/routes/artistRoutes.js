const express = require('express');
const router = express.Router();
const artistModel = require('../models/artistModel');

// CREATE - Create a new artist
router.post('/artists', async (req, res) => {
  try {
    const artist = await artistModel.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all artists
router.get('/artists', async (req, res) => {
  try {
    const artists = await artistModel.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get a specific artist
router.get('/artist/:id', getArtist, (req, res) => {
  res.json(res.artist);
});

// UPDATE - Update a specific artist
router.put('/artist/:id', getArtist, async (req, res) => {
  try {
    if (req.body.artistName != null) {
      res.artist.artistName = req.body.artistName;
    }
    if (req.body.Town != null) {
      res.artist.Town = req.body.Town;
    }
    if (req.body.biography != null) {
      res.artist.biography = req.body.biography;
    }
    const updatedArtist = await res.artist.save();
    res.json(updatedArtist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a specific artist
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
