import React from "react";
import { Link } from "react-router-dom";
import "./Overview.css";
import { motion } from "framer-motion"; // For animations
import Navbar from "../Navbar/Navbar";

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
          <h1>Welcome to RackTrackCO2</h1>
          <p>
          **RackTrackCO2** is your ultimate solution for tracking and managing IT asset sustainability.  
            Our platform helps organizations monitor **CO2 emissions**, optimize energy usage, and take  
            informed actions toward **reducing their carbon footprint**. By leveraging real-time data  
            and analytics, we empower businesses to make eco-friendly IT decisions and contribute  
            to a greener future.
          </p>
        </motion.div>

        <div className="overview-links">
          <motion.div
            className="overview-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Upload Device</h3>
            <p>Add IT assets to track their sustainability impact.</p>
            <Link to="/upload-device">Go to Upload</Link>
          </motion.div>

          <motion.div
            className="overview-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3>See Reports</h3>
            <p>View detailed CO2 emissions reports for your assets.</p>
            <Link to="/see-report">View Reports</Link>
          </motion.div>

          <motion.div
            className="overview-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Generate CO2 Report</h3>
            <p>Calculate carbon footprint for IT assets.</p>
            <Link to="/generate-co2">Generate Report</Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
