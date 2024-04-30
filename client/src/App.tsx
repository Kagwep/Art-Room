import React,{ useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAccount, useNetwork } from 'wagmi';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange,green } from '@mui/material/colors';
import {
  LoginGuard,
} from './features';





import Home from "./pages/Home"
import RoomDetails from "./pages/RoomDetails";
import AllRooms from "./pages/AllRooms";
import Galleries from "./pages/Galleries";
import MyGallery from "./pages/MyGallery";
import MyGalleryDetails from "./pages/MyGalleryDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}


const theme = createTheme({
  status: {
    danger: green[500],
  },
});



function App() {
  const { connector } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    if (!connector) {
      return;
    }
  }, [connector, chain]);



  



  return (
    <div className="App">
       <Header />
      <ThemeProvider theme={theme}>
        <div className="">
          <Routes>
            <Route
              path={`/`}
              element={
                 <Home />
              }
            />
            <Route
              path={`/galleries`}
              element={
                <LoginGuard>
                  <Galleries />
                </LoginGuard>
              }
            />
            <Route
              path={`/my-galleries`}
              element={
                <LoginGuard>
                  <MyGallery />
                </LoginGuard>
              }
            />
            <Route
              path={`/my-galleries/:id`}
              element={
                <LoginGuard>
                  <MyGalleryDetails />
                </LoginGuard>
              }
            />
            <Route
              path={`/virtual-gallery`}
              element={
                <LoginGuard>
                  <AllRooms />
                </LoginGuard>
              }
            />
            <Route
              path={`/room/:id`}
              element={
                <LoginGuard>
                  <RoomDetails />
                </LoginGuard>
              }
            />
            {/* default redirect */}
            <Route path="*" element={<Navigate to={`/`} />} />
          </Routes>

        </div>
      </ThemeProvider>
      <Sidebar />
         <Footer />
    </div>
  );
}

export default App;
