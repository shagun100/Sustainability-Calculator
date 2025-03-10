/*import React, { useState, useEffect } from "react";
import "./DeviceHeatmap.css";

interface Device {
  id: number;
  name: string;
  powerUsage: number; // in Watts
  location: { x: number; y: number }; // X, Y coordinates in the grid
}

interface HeatmapProps {
  devices: Device[];
}

const DeviceHeatmap: React.FC<HeatmapProps> = ({ devices }: HeatmapProps) => {
  const [maxPower, setMaxPower] = useState(1); // Prevent division by zero

  useEffect(() => {
    // Find the maximum power usage to normalize heatmap colors
    if (devices.length > 0) {
      setMaxPower(Math.max(...devices.map((d) => d.powerUsage)));
    }
  }, [devices]);

  // Function to determine color intensity based on power usage
  const getColor = (powerUsage: number) => {
    const intensity = powerUsage / maxPower;
    if (intensity < 0.3) return "#4CAF50"; // Green (low)
    if (intensity < 0.7) return "#FFC107"; // Yellow (medium)
    return "#F44336"; // Red (high)
  };

  return (
    <div className="heatmap-container">
      {devices.map((device) => (
        <div
          key={device.id}
          className="heatmap-cell"
          style={{
            backgroundColor: getColor(device.powerUsage),
            left: `${device.location.x}%`,
            top: `${device.location.y}%`,
          }}
          title={`${device.name} - ${device.powerUsage}W`} // Tooltip
        ></div>
      ))}
    </div>
  );
};

export default DeviceHeatmap;*/
