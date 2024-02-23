const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  artType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateMade: {
    type: Date,
    required: true
  },
  keywords: {
    type: [String],
    required: false
  },
  imageURI: {
    type: String,
    required: false
  },
  artistId: {
    type: String,
    required: true
  }
});

const artModel = mongoose.model('artModel', artSchema);

module.exports = artModel;
