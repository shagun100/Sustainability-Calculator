import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import DashboardContainer from "./DashboardContainer";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
