const mongoose = require("mongoose");

// Creating a MongoDB schema for the user

const Song = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

// creating a User Model
const SongModel = mongoose.model("Song", Song);

module.exports = SongModel;
