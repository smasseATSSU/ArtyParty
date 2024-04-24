const express = require("express");
const app = express();
const cors = require('cors')
const artRoutes = require('./routes/artRoutes')
const artistRoutes = require('./routes/artistRoutes')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const Artwork = require('./models/artModel');

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/artists', artistRoutes)
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/art', artRoutes)

app.post('/artwork', async (req, res) => {
    try {
      // Extract artwork data from request body
      const { title, artistName, description, imageURI } = req.body;

      const newArtwork = new Artwork({
        title,
        artistName,
        description,
        imageURI,
        artType
        // Add more fields as needed
      });
  
      // Save artwork document to database
      await newArtwork.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Artwork created successfully', artwork: newArtwork });
    } catch (error) {
      // Handle errors
      console.error('Error creating artwork:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
