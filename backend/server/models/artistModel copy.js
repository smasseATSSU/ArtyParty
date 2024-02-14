const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  
  artistName: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: False
  },
  biography: {
    type: String,
    required: true
  }
});

const artistModel = mongoose.model('artistModel', artistSchema);

module.exports = artModel;
