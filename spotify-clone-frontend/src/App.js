import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./Routes/Login";
import SignupComponent from "./Routes/Signup";
import HomeComponent from "./Routes/Home";
import TestComponent from "./Routes/Test";
import { useCookies } from "react-cookie";
import LoggedInHomeComponent from "./Routes/LoggedInHome";
import UploadSong from "./Routes/UploadSong";
import MyMusic from "./Routes/MyMusic";
import songContext from "./Contexts/songContext";
import { useState } from "react";
import ExplorePage from "./Routes/ExplorePage";
import Library from "./Routes/Library";
import SinglePlaylistView from "./Routes/SinglePlaylistView";

function App() {
  const [cookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  console.log(cookie.token);
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        {cookie.token ? (
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/" element={<WelcomeComponent />}></Route>
              <Route path="/test" element={<TestComponent />}></Route>
              <Route path="/home" element={<LoggedInHomeComponent />}></Route>
              <Route path="/mymusic" element={<MyMusic />}></Route>
              <Route path="/explore" element={<ExplorePage />}></Route>
              <Route path="/uploadsong" element={<UploadSong />}></Route>
              <Route path="/library" element={<Library />}></Route>
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              ></Route>
              <Route path="*" element={<Navigate to="/home" />}></Route>
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="/home" element={<HomeComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/signup" element={<SignupComponent />}></Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        )}
      </BrowserRouter>
      {/* Adding routes component here indicates to the {react-router-dom} that we are starting to define our routes inside */}
    </div>
  );
}

const WelcomeComponent = () => {
  return <h1>Welcome to Spotify</h1>;
};

export default App;
