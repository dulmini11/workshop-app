import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockUsers from '../../data/mockUsers.json';
import './LoginRegister.css';
import googleIcon from '../../assets/google_icon.png';

const LoginRegister = ({ setIsLoggedIn }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const navigate = useNavigate();

  const showRegisterForm = () => setShowRegister(true);
  const showLoginForm = () => setShowRegister(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      alert('All fields are required');
      return;
    }

    const matchedUser = mockUsers.find(
      (user) =>
        user.username.toLowerCase() === loginUsername.toLowerCase() &&
        user.password === loginPassword
    );

    if (matchedUser) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      alert(`Login successful for ${matchedUser.username}`);
      navigate(matchedUser.profileRoute || '/');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerUsername || !registerEmail || !registerPassword) {
      alert('All fields are required');
      return;
    }
    alert(`Registered with username: ${registerUsername}`);
    // You can add registration logic here (e.g., save new user)
    setShowRegister(false); // Optionally switch to login after registration
  };

  return (
    <div className="login-register-container">
      <span className="shape shape1"></span>
      <span className="shape shape2"></span>

      <div className="container">
        {/* Left Side - Welcome Message */}
        <div className="welcome-section">
          <div className="welcome-content">
            {!showRegister ? (
              <>
                <h1 className="welcome-title">Hello, Welcome!</h1>
                <p className="welcome-text">Already have an account?</p>
                <button className="welcome-btn" onClick={showRegisterForm}>
                  Register
                </button>
              </>
            ) : (
              <>
                <h1 className="welcome-title">Welcome Back!</h1>
                <p className="welcome-text">Don't have an account?</p>
                <button className="welcome-btn" onClick={showLoginForm}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className="forms-section">
          {/* Login Form */}
          {!showRegister && (
            <div className="form-box">
              <div className="form">
                <h1 className="title">Login</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot-link">
                  <a href="#">Forgot password?</a>
                </div>
                <button className="btn" onClick={handleLoginSubmit}>
                  Login
                </button>
                <p className="switch-text">
                  Don't have an account?{' '}
                  <span className="switch-link" onClick={showRegisterForm}>
                    Register here
                  </span>
                </p>
                <p className="social-text">or login with Google</p>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <img src={googleIcon} alt="Google" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {showRegister && (
            <div className="form-box">
              <div className="form">
                <h1 className="title">Registration</h1>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="btn" onClick={handleRegisterSubmit}>
                  Register
                </button>
                <p className="switch-text">
                  Already have an account?{' '}
                  <span className="switch-link" onClick={showLoginForm}>
                    Login here
                  </span>
                </p>
                <p className="social-text">or register with Google</p>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <img src={googleIcon} alt="Google" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
