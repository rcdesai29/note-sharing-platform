// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ClassPage from "./pages/ClassPage";
import UploadPage from "./pages/UploadPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Feedback from './pages/FeedbackPage';
import Profile from "./pages/Profile";
import styled from "styled-components";
import { colors } from "./theme";
import Navbar from "./components/Navbar";

const AppContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Navbar></Navbar>
        <Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/class/:id" element={<ClassPage />} />
            <Route path="/upload/:id" element={<UploadPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
