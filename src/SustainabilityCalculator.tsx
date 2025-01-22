import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./SustainabilityCalculator.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SustainabilityCalculator = () => {
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceModel: "",
    vendor: "",
    minPower: "",
    maxPower: "",
    uptime: "24", // Default 24 hours
  });

  const [tableData, setTableData] = useState<{ deviceName: string; deviceModel: string; vendor: string; minPower: string; maxPower: string; uptime: string; kWh: string; co2: string; }[]>([]);
  const [chartData, setChartData] = useState<{
      labels: string[];
      datasets: {
          label: string;
          data: number[];
          backgroundColor: string;
      }[];
  }>({
      labels: [],
      datasets: [
        {
          label: "CO2 Emission (kg)",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });

  // Handle form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate kWh and CO2 emission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { deviceName, deviceModel, vendor, minPower, maxPower, uptime } = formData;

    const kWh = ((parseFloat(maxPower) || 0) * parseFloat(uptime)) / 1000;
    const co2 = kWh * 0.5; // Assuming a Carbon Intensity Factor of 0.5 kg/kWh

    const newRow = {
      deviceName,
      deviceModel,
      vendor,
      minPower: minPower || "None",
      maxPower,
      uptime,
      kWh: kWh.toFixed(2),
      co2: co2.toFixed(2),
    };

    setTableData((prev) => [...prev, newRow]);

    // Update chart data
    setChartData((prev) => ({
      ...prev,
      labels: [...prev.labels, deviceName],
      datasets: [
        {
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, co2],
        },
      ],
    }));
  };

  // Handle edit action
  const handleEdit = (index: number) => {
    const row = tableData[index];
    setFormData({
      deviceName: row.deviceName,
      deviceModel: row.deviceModel,
      vendor: row.vendor,
      minPower: row.minPower,
      maxPower: row.maxPower,
      uptime: row.uptime,
    });
    // Remove the row from the table data
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle delete action
  const handleDelete = (index: number) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="sustainability-calculator">
      <header>
        <h1>Rackspace Technology Sustainability Calculator</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="button-group">
          <button type="button">Internal Rackspace</button>
          <button type="button">Rackspace's Customer</button>
        </div>

        <div className="form-group">
          <label>Device Name</label>
          <select name="deviceName" onChange={handleInputChange} required>
            <option value="">Select Device</option>
            <option value="Device A">Device A</option>
            <option value="Device B">Device B</option>
          </select>
        </div>

        <div className="form-group">
          <label>Device Model</label>
          <select name="deviceModel" onChange={handleInputChange} required>
            <option value="">Select Model</option>
            <option value="Model X">Model X</option>
            <option value="Model Y">Model Y</option>
          </select>
        </div>

        {formData.deviceModel && (
          <div className="form-group">
            <label>Vendor Name</label>
            <select name="vendor" onChange={handleInputChange} required>
              <option value="">Select Vendor</option>
              <option value="Vendor 1">Vendor 1</option>
              <option value="Vendor 2">Vendor 2</option>
            </select>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Min Power Consumption (Watts)</label>
            <input
              type="number"
              name="minPower"
              value={formData.minPower}
              onChange={handleInputChange}
              placeholder="Optional"
            />
          </div>
          <div className="form-group">
            <label>Max Power Consumption (Watts)</label>
            <input
              type="number"
              name="maxPower"
              value={formData.maxPower}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Uptime (hours)</label>
          <input
            type="number"
            name="uptime"
            value={formData.uptime}
            onChange={handleInputChange}
            placeholder="Default: 24"
          />
        </div>

        <p className="note">
          We will take the max power consumption value to calculate CO2 emissions, as it accounts for the maximum load.
        </p>

        <button type="submit">Calculate</button>
      </form>

      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Device Model</th>
            <th>Vendor</th>
            <th>Min Power (W)</th>
            <th>Max Power (W)</th>
            <th>Uptime (hrs)</th>
            <th>kWh</th>
            <th>CO2 (kg)</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.deviceName}</td>
              <td>{row.deviceModel}</td>
              <td>{row.vendor}</td>
              <td>{row.minPower}</td>
              <td>{row.maxPower}</td>
              <td>{row.uptime}</td>
              <td>{row.kWh}</td>
              <td>{row.co2}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>CO2 Emission Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default SustainabilityCalculator;

