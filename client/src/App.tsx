import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails";
import AllRooms from "./pages/AllRooms";

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
