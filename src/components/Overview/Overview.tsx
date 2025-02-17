import React from "react";
import { Link } from "react-router-dom";
import { FiUpload, FiBarChart, FiCloud } from "react-icons/fi";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import "./Overview.css";

const OverviewPage = () => {
  return (
    <>
      <Navbar />
      <div className="overview-container">
        <motion.div
          className="overview-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>RackTrackCO2</h1>
          <p>**RackTrack CO₂ Overview**  

RackTrack helps Rackspace assess IT asset sustainability by calculating carbon emissions for its devices. By analyzing power consumption and emission factors, RackTrack provides data-driven insights that enable Rackspace to take informed steps toward **reducing its carbon footprint.
While RackTrack does not provide real-time tracking, it delivers detailed carbon impact calculations based on device specifications and usage data. This allows Rackspace to optimize energy efficiency, align with sustainability initiatives, and contribute to a greener future.</p>
        </motion.div>

        <div className="overview-links">
          <motion.div className="overview-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="icon-container"><FiUpload /></div>
            <h3>Upload Device</h3>
            <p>Want to dive deeper? Our device-level tracking lets you monitor power consumption for each registered device. </p>
            <Link to="/upload-device">Upload Now</Link>
          </motion.div>

          <motion.div className="overview-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="icon-container"><FiBarChart /></div>
            <h3>See Reports</h3>
            <p>View in-depth CO2 emissions reports.</p>
            <Link to="/see-report">View Reports</Link>
          </motion.div>

          <motion.div className="overview-card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <div className="icon-container"><FiCloud /></div>
            <h3>Generate CO2 Report</h3>
            <p>Calculate the carbon footprint of IT assets.</p>
            <Link to="/generate-co2">Generate Now</Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
