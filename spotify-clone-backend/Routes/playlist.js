const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../Models/Playlist");
const User = require("../Models/User");
const Song = require("../Models/Song");

// Route 1: Create a Playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;

    // if we do not get the database
    if (!name || !thumbnail || !songs) {
      return res.status(301).json({ error: "Insufficient data" });
    }

    const playlistData = {
      name,
      thumbnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };

    // creating the playlist
    const playlist = await Playlist.create(playlistData);

    return res.status(200).json(playlist);
  }
);

// Route 2: Get a playlist by ID
// We will get the playlist id as a route parameter and we will return the playlist having that id
// /something1/something2/something3 ---> exact match
// if we do /playlist/get/:playlistId (: ---> this means that playlistId is a variable to which we can assign any value)

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // This concept is called req.params
    const playlistId = req.params.playlistId;
    // I need to find a playlist with the _id = playlistId
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({
      path: "songs",
      populate: {
        path: "artist",
        select: "name",
      },
    });
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

// Get all playlists made by me
// /get/me
router.get(
  "/get/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.user._id;

    const playlists = await Playlist.find({ owner: artistId }).populate(
      "owner"
    );
    return res.status(200).json({ data: playlists });
  }
);

// Get all the playlists made by an artist
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;

    // We can check if the artist exists or not
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(304).json({ error: "Invalid Artist ID." });
    }

    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

// Add a song to a playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;

    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findOne({ _id: playlistId });

    if (!playlist) {
      return res.status(304).json({ error: "Playlist does not exist." });
    }

    // Check if the currentUser owns the playlist or is a collaborator
    if (
      !playlist.owner.equals(currentUser._id) &&
      !playlist.collaborators.includes(currentUser._id)
    ) {
      return res.status(400).json({ error: "Not Allowed." });
    }

    // check if the song is a valid song
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ error: "Song does not exist." });
    }

    // adding the song to playlist
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
  }
);

module.exports = router;
