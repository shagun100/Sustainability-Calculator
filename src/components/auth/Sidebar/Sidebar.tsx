import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2>Dashboard</h2>
        <ul>
          <li><a href="#">Overview</a></li>
          <li><a href="#">Devices</a></li>
          <li><a href="#">Emission</a></li>
          <li><a href="#">Reports</a></li>
          {/* Add other sidebar items */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
