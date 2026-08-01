import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Queue from "./components/Queue/Queue";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import Playlist from "./pages/Playlist/Playlist";
import Library from "./pages/Library/Library";
import Login from "./pages/Login/Login";
import Artist from "./pages/Artist/Artist";
import Lyrics from "./pages/Lyrics/Lyrics";
import LikedSongs from "./pages/LikedSongs/LikedSongs";

function SpotifyLayout() {
  return (
    <div className="app">
      <div className="main-layout">
        <Sidebar />

        <div className="content">
          <Navbar />

          <Routes>
            <Route index element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/library" element={<Library />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/lyrics" element={<Lyrics />} />

            {/* Invalid route */}
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route
  path="/liked"
  element={<LikedSongs />}
/>
          </Routes>
        </div>

        <Queue />
      </div>

      <MusicPlayer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <SpotifyLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;