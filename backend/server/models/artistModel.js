const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  
  artistName: {
    type: String,
    required: true
  },
  Town: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  }
});

const artistModel = mongoose.model('Artist', artistSchema);

module.exports = artistModel;
