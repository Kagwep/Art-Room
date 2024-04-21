import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails";
import AllRooms from "./pages/AllRooms";
import Galleries from "./pages/Galleries";
import MyGallery from "./pages/MyGallery";
import MyGalleryDetails from "./pages/MyGalleryDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/galleries" element={<Galleries />}></Route>
          <Route path="/my-galleries" element={<MyGallery />}></Route>
          <Route path="/my-galleries/:id" element={<MyGalleryDetails />}></Route>
          <Route path="/virtual-gallery" element={<AllRooms />}></Route>
          <Route path="/room/:id" element={<RoomDetails />}></Route>
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
