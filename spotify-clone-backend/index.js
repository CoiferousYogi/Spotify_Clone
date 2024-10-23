// mpm init : package.json --> This is a node project

// We will use express
const express = require("express");

// importing mongoose for connecting to MongoDB database
const mongoose = require("mongoose");
// importing dotenv for password protection of MongoDB db
require("dotenv").config();

// setting up passport-jwt
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const passport = require("passport");

// importing User
const User = require("./Models/User");

// importing auth routes from auth.js
const authRoutes = require("./Routes/auth");

// importing song routes from song.js
const songRoutes = require("./Routes/song");

// importing playlist routes from playlist.js
const playlistRoutes = require("./Routes/playlist");

// importing cors
const cors = require("cors");

const app = express();
//declaring the port
const port = 8080;

// converting every data received to json
app.use(express.json());

// calling cors
app.use(cors());

//console.log(process.env);

// Connect MongoDB to our Node app
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo");
  });
//mongoose.connect() takes 2 args:
// 1. Which db to connect to(DB url)
// 2. Connection options

// Setting up passport-jwt

// let opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
// // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
// //     User.findOne({id: jwt_payload.sub}, function(err, user) {
// //         if (err) {
// //             return done(err, false);
// //         }
// //         if (user) {
// //             return done(null, user);
// //         } else {
// //             return done(null, false);
// //             // or you could create a new account
// //         }
// //     });
// // })); // Not supported in newer Mongoose versions so rewriting using try catch instead
// passport.use(
//   new JwtStrategy(opts, async function (jwt_payload, done) {
//     try {
//       const user = await User.findOne({ _id: jwt_payload.identifier });
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     } catch (err) {
//       return done(err, false);
//     }
//   })
// );

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.identifier });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// making a GET api which will return text : "Hello World"

app.get("/", (req, res) => {
  // req = request contains all data for request
  // res = response => contains all data for response
  res.send("Hello World!");
});
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

// Now we want to tell express that our backend will run on localhost:8000

app.listen(port, () => {
  console.log("App is running on port " + port);
});
