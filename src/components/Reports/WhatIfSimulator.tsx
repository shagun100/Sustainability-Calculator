import React, { useState } from "react";
import "./WhatIfSimulator.css";

const WhatIfSimulator = () => {
  // State for input values
  const [deviceCount, setDeviceCount] = useState(10);
  const [powerUsage, setPowerUsage] = useState(500); // in watts
  const [efficiency, setEfficiency] = useState(80); // efficiency percentage

  // Calculate estimated energy & CO₂ impact
  const estimatedEnergy = ((deviceCount * powerUsage * (100 - efficiency)) / 1000).toFixed(2);
  const estimatedEmissions = (parseFloat(estimatedEnergy) * 0.5).toFixed(2); // Example conversion

  return (
    <div className="whatif-container">
      <h2>⚙️ What-If Simulator</h2>
      <p>Adjust parameters and see the impact on energy usage & emissions.</p>

      <div className="input-group">
        <label>Number of Devices</label>
        <input type="number" value={deviceCount} onChange={(e) => setDeviceCount(parseInt(e.target.value) || 0)} />
      </div>

      <div className="input-group">
        <label>Average Power Usage (W)</label>
        <input type="number" value={powerUsage} onChange={(e) => setPowerUsage(parseInt(e.target.value) || 0)} />
      </div>

      <div className="input-group">
        <label>Efficiency (%)</label>
        <input type="number" value={efficiency} onChange={(e) => setEfficiency(parseInt(e.target.value) || 0)} />
      </div>

      <div className="results">
        <p>🔋 Estimated Energy: <strong>{estimatedEnergy} kWh</strong></p>
        <p>☁️ Estimated CO₂ Emissions: <strong>{estimatedEmissions} kg</strong></p>
      </div>
    </div>
  );
};

export default WhatIfSimulator;
