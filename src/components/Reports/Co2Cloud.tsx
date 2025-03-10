/*import React, { useState, useEffect } from "react";
import "./Co2Cloud.css";

interface Co2CloudProps {
  emissions: number; // Emissions in kg CO₂
}

const Co2Cloud: React.FC<Co2CloudProps> = ({ emissions }: Co2CloudProps) => {
  // Define cloud size based on emissions
  const [cloudSize, setCloudSize] = useState(50); // Default size

  useEffect(() => {
    // Scale cloud size dynamically based on emissions level (adjust these values as needed)
    const newSize = Math.min(300, Math.max(50, emissions * 10));
    setCloudSize(newSize);
  }, [emissions]);

  return (
    <div className="co2-cloud-container">
      <div
        className="co2-cloud"
        style={{ width: cloudSize + "px", height: cloudSize + "px" }}
      >
        ☁️
      </div>
      <p className="co2-label">{emissions} kg CO₂</p>
    </div>
  );
};

export default Co2Cloud;*/
