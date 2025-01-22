import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/auth/Dashboard/Dashboard';
import DeviceList from './components/auth/devices/Devicelist';
import SignUp from './components/auth/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/devices" element={<DeviceList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;