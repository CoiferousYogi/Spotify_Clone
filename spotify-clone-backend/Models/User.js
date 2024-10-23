const mongoose = require("mongoose");

// Creating a MongoDB schema for the user

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedSongs: {
    // we will change this array later
    type: String,
    default: "",
  },
  likedPlaylists: {
    // we will change this to array later
    type: String,
    default: "",
  },
  subscribedArtists: {
    // we will change this to array later
    type: String,
    default: "",
  },
});

// creating a User Model
const UserModel = mongoose.model("User", User);

module.exports = UserModel;
