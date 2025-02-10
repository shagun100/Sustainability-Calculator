/*import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/Signup";
import Dashboard from "./components/auth/Dashboard/Dashboard";
import DeviceList from "./components/auth/devices/Devicelist";
import SignIn from "./components/auth/SignIn";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<DeviceList />} />
      </Routes>
    </Router>
  );
};

export default App;*/
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import DeviceList from "./components/auth/devices/Devicelist";
import SignIn from "./components/auth/SignIn";
import EmissionContainer from "./components/auth/Emission/EmissionContainer";
import Overview from "./components/Overview/Overview";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/overview" element={<Overview />} />  {/* Added Overview Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<DeviceList />} />
        <Route path="/emission" element={<EmissionContainer />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
