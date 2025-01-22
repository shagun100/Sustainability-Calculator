import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS for styling
import OIP from '../../assets/OIP.jpg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && password === confirmPassword) {
      // In a real-world scenario, you would send these values to a backend API
      console.log('Signed Up');
      navigate('/devices'); // Redirect to device page on successful signup
    } else {
      setError('Please fill in all fields correctly');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
      <img src={OIP} alt="Rackspace Logo" className="auth-logo" />        
      <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signin-link">
          <p>Already have an account?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
