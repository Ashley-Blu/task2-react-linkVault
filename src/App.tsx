import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Landing/Landing';
import SignUpPage from './Components/SignUp/SignUp';
import LoginPage from './Components/Login/Login';
import LinkPage from './Components/LinkPage/LinkPage';
import AddLinkPage from './Components/AddLinkPage/AddLinkPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/linkpage" element={<LinkPage />} />
      <Route path="/addlinkpage" element={<AddLinkPage />} />
    </Routes>
  );
}

export default App;
