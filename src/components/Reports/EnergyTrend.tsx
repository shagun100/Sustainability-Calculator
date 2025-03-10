/*import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define props type
interface EnergyTrendProps {
  energyData: { time: string; usage: number }[];
}

const EnergyTrend: React.FC<EnergyTrendProps> = ({ energyData }: EnergyTrendProps) => {
  const data = {
    labels: energyData.map((entry) => entry.time), // Time labels
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: energyData.map((entry) => entry.usage), // Usage data points
        borderColor: "#ff3b3b",
        backgroundColor: "rgba(255, 59, 59, 0.2)",
        tension: 0.4, // Smooth curve
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
   
    scales: {
        x: {
          title: { display: true, text: "Time", color: "#ffffff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          ticks: { color: "#ffffff" },
        },
        y: {
          title: { display: true, text: "Energy Usage (kWh)", color: "#ffffff" },
          grid: { color: "rgba(255,255,255,0.2)" },
          ticks: { color: "#ffffff" },
        },
      },
    };
  
    return (
      <div className="energy-trend-container">
        <h2>📈 Energy Consumption Trend</h2>
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default EnergyTrend;*/
  