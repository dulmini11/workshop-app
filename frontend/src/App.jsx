import UserDetails from './pages/UserDetails/UserDetails.jsx';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage.jsx";
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshop/:id" element={<DetailsPage />} />
          <Route path="/profile" element={<UserDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
