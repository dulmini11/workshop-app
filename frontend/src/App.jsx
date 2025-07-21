import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import UserDetails from './pages/UserDetails/UserDetails.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Persist login status on page refresh
  useEffect(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    if (storedStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshop/:id" element={<DetailsPage />} />
          {/* Single /profile route handling login and user details */}
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <UserDetails setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <LoginRegister setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
