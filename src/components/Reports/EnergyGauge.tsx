import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

interface EnergyGaugeProps {
  energyUsage: number; // Dynamic energy consumption value
}

const EnergyGauge: React.FC<EnergyGaugeProps> = ({ energyUsage }: EnergyGaugeProps) => {
  const gaugeData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [energyUsage, 100 - energyUsage], // Dynamic gauge level
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"], // Green, Yellow, Red
        borderWidth: 0,
      },
    ],
  };

  const gaugeOptions = {
    circumference: 180, // Half-circle gauge
    rotation: -90, // Start from the bottom
    cutout: "80%",
    responsive: true,
  };

  return (
    <div className="gauge-container">
      <h3>Energy Usage</h3>
      <Doughnut data={gaugeData} options={gaugeOptions} />
      <p>{energyUsage}% of capacity</p>
    </div>
  );
};

export default EnergyGauge;
