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
  ,
  imageURI: {
    type: String,
    required: true
  },
  typeOfArt: {
    type: String,
    required: true
  }
}
,
{ collection: "artistModel" }
);

const artistModel = mongoose.model('Artist', artistSchema);

module.exports = artistModel;
