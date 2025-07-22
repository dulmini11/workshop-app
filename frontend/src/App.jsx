import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import DetailsPage from './pages/DetailsPage/DetailsPage.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import LoginRegister from './pages/LoginRegister/LoginRegister.jsx';
import UserDetails from './pages/UserDetails/UserDetails.jsx';
import ReviewsForm from './pages/ReviewsForm/ReviewsForm.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Persist login status on change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshop/:id" element={<DetailsPage />} />

          {/* Protected route: show UserDetails only if logged in */}
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <UserDetails setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/loginRegister" />
              )
            }
          />
          {/*Login/Register page route */}
          <Route
            path="/loginRegister"
            element={<LoginRegister setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/add-review/:id" element={<ReviewsForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
