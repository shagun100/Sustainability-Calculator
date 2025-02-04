// Navbar.tsx
import React from "react";
import "./Navbar.css";
import Rackspace from "../../assets/Rackspace.png";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <div id="navbar" className="navbar">
      <img src={Rackspace} alt="Rackspace Logo" className="logoImage" />
      <SearchBar />
      <div id="icons" className="icons">
        <div id="copilot" className="icon">🧑‍💻</div>
        <div id="something" className="icon">⚙️</div>
        <div id="feedback" className="icon">💬</div>
        <div id="settings" className="icon">🔧</div>
      </div>

      {/* Profile Icon */}
      {/* <div id="profile" style={styles.profile}>
        <img src="profile.jpg" alt="Profile" style={styles.profileImage} />
      </div> */}
    </div>
  );
};

export default Navbar;
