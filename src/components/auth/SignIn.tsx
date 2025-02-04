import React, { useState } from 'react';
import './Auth.css'; // Import the CSS for styling
import OIP from '../../assets/OIP.jpg';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // In a real-world scenario, you would send these values to a backend API
      console.log('Signed In');
      navigate('/overview');  // Redirect to device page on successful login
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={OIP} alt="Rackspace Logo" className="auth-logo" />
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {/* <div className="signup-link">
          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>*/}
      </div>
    </div>
  );
};

export default SignIn;
