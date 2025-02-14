import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SystemData.css";

const SystemData = () => {
  const [deviceModels, setDeviceModels] = useState<{ id: string; name: string }[]>([]);
  const [dataCenters, setDataCenters] = useState<{ id: string; name: string }[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedDataCenter, setSelectedDataCenter] = useState("");

  /*useEffect(() => {
    // Fetch device models
    axios.get("https://localhost") // Update with your actual API endpoint
      .then(response => setDeviceModels(response.data))
      .catch(error => console.error("Error fetching device models:", error));

    // Fetch data centers
    axios.get("/api/data-centers") // Update with your actual API endpoint
      .then(response => setDataCenters(response.data))
      .catch(error => console.error("Error fetching data centers:", error));
  }, []);*/

  return (
    <div className="system-data-container">
        <Navbar />
      <div className="dropdown-container">
        <label>Device Model:</label>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="">Select a model</option>
          {deviceModels.map((model) => (
            <option key={model.id} value={model.name}>{model.name}</option>
          ))}
        </select>

        <label>Data Center:</label>
        <select value={selectedDataCenter} onChange={(e) => setSelectedDataCenter(e.target.value)}>
          <option value="">Select a data center</option>
          {dataCenters.map((center) => (
            <option key={center.id} value={center.name}>{center.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SystemData;
