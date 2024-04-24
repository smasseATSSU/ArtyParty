const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: false
  },
  artType: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  dateMade: {
    type: Date,
    required: false
  },
  keywords: {
    type: [String],
    required: false
  },
  imageURI: {
    type: String,
    required: true
  },
  artistId: {
    type: String,
    required: true
  }
});

const artModel = mongoose.model('artModel', artSchema);

module.exports = artModel;
