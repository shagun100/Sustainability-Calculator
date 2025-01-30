import { useState } from 'react';
import AddDeviceForm from './AddDeviceForm';
import './Devices.css';

const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showForm, setShowForm] = useState(false);

  interface Device {
    name: string;
    model: string;
    vendor: string;
    power: number;
    uptime: number;
    co2: number;
  }

  const handleAddDevice = (device: Device) => {
    setDevices([...devices, device]);
    setShowForm(false); // Close form after submission
  };

  return (
    <div className="device-page">
      {/* Banner Section */}
      <header className="banner">
        <h1>Rackspace Devices</h1>
      </header>

      {/* Add Device Button */}
      <div className="top-bar">
        <button className="add-device-btn" onClick={() => setShowForm(true)}>
          + Add New Device
        </button>
      </div>

      {/* Device Table */}
      <div className="device-table">
        <table>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Device Model</th>
              <th>Vendor</th>
              <th>Power Consumption</th>
              <th>Uptime</th>
              <th>CO2 Output</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index}>
                <td>{device.name}</td>
                <td>{device.model}</td>
                <td>{device.vendor}</td>
                <td>{device.power}</td>
                <td>{device.uptime}</td>
                <td>{device.co2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Device Form */}
      {showForm && <AddDeviceForm onAddDevice={handleAddDevice} />}
    </div>
  );
};

export default DeviceList;
