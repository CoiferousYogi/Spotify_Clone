const express = require("express");
const passport = require("passport");
const router = express.Router();
//const passport = require("passport");
const Song = require("../Models/Song");

const User = require("../Models/User");

// Creating a POST request for songs
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // req.user gets the user because of passport.authenticate
    const { name, thumbnail, track } = req.body;

    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song." });
    }

    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };

    // creating the song
    const createdSong = await Song.create(songDetails);

    return res.status(200).json(createdSong);
  }
);

// Get route to get all the songs I have published
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    // We need to get all songs where artist id = currentUser._id
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

// Get route to get all the songs published by an artist
// I will send the artist id and I want to see all the songs that the artist has published
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;

    // We can check if the artist exists or not
    const artist = await User.find({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ error: "Artist does not exist." });
    }

    const songs = await Song.find({ artist: artistId });

    return res.status(200).json({ data: songs });
  }
);

// Get route to get a single song by an artist
router.get(
  "get/songname/:songname",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;

    const songs = await Song.find({ name: songName });

    return res.status(200).json({ data: songs }).populate("artist");

    // will add pattern matching instead of string search in future update
  }
);

module.exports = router;
