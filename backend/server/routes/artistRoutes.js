const express = require('express');
const router = express.Router();
const artistModel = require('../models/artistModel'); 

router.post('/artwork', async (req, res) => {
  try {
    const artwork = await artistModel.create(req.body);
    res.status(201).json(artwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all artworks
router.get('/artwork', async (req, res) => {
  try {
    const artworks = await artistModel.find();
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get a specific artwork
router.get('/artwork/:id', getArtwork, (req, res) => {
  res.json(res.artwork);
});

// UPDATE - Update a specific artwork
router.put('/artwork/:id', getArtwork, async (req, res) => {
  if (req.body.title != null) {
    res.artwork.title = req.body.title;
  }
  if (req.body.artistName != null) {
    res.artwork.artistName = req.body.artistName;
  }
  if (req.body.artType != null) {
    res.artwork.artType = req.body.artType;
  }
  if (req.body.description != null) {
    res.artwork.description = req.body.description;
  }
  if (req.body.dateMade != null) {
    res.artwork.dateMade = req.body.dateMade;
  }
  if (req.body.keywords != null) {
    res.artwork.keywords = req.body.keywords;
  }
  if (req.body.imageURI != null) {
    res.artwork.imageURI = req.body.imageURI;
  }
  try {
    const updatedArtwork = await res.artwork.save();
    res.json(updatedArtwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a specific artwork
router.delete('/artwork/:id', getArtwork, async (req, res) => {
  try {
    await res.artwork.remove();
    res.json({ message: 'Artwork deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getArtwork(req, res, next) {
  try {
    const artwork = await artistModel.findById(req.params.id);
    if (artwork == null) {
      return res.status(404).json({ message: 'Cannot find artwork' });
    }
    res.artwork = artwork;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;