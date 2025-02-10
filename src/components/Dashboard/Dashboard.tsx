import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../auth/Sidebar/Sidebar";
import DashboardContainer from "./DashboardContainer";
import "./Dashboard.css";
import Banner from "../Banner/Banner";


const Dashboard = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <DashboardContainer />
      </div>
    </div>
    
  );
};

export default Dashboard;
