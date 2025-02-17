import React, { useState } from "react";
import axios from "axios"; // Import axios

interface Device {
  accountNumber: string;
  accountType: "Internal" | "External";
  accountName: string;
  deviceNumber: number;
  deviceType: string;
  deviceModel: string;
  status: string;
  dataCenter: string;
  hostname: string;
}

interface AddDeviceModalProps {
  closeModal: () => void;
  setDeviceData: (data: Device[]) => void;
  deviceData: Device[];
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
  closeModal,
  setDeviceData,
  deviceData,
}) => {
  const [newDevice, setNewDevice] = useState<Device>({
    accountNumber: "",
    accountType: "Internal", // Default value
    accountName: "",
    deviceNumber: 0,
    deviceType: "",
    deviceModel: "",
    status: "",
    dataCenter: "",
    hostname: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!newDevice.accountNumber.trim()) {
      alert("Account Number is required!");
      return;
    }
    if (!newDevice.accountName.trim()) {
      alert("Account Name is required!");
      return;
    }
    if (!newDevice.deviceNumber) {
      alert("Device Number is required!");
      return;
    }
    if (!newDevice.deviceType.trim()) {
      alert("Device Type is required!");
      return;
    }

    try {
      // Make a POST request to your API to add the new device
      const response = await axios.post("/device", newDevice);
      if (response.status === 201) {
        // On success, update the parent state with the new device
        setDeviceData([...deviceData, newDevice]);
        closeModal(); // Close modal after submission
      }
    } catch (error) {
      console.error("Error adding device:", error);
      if (axios.isAxiosError(error)) {
        console.error("Server Response:", error.response?.data);
      }
      alert("Failed to add the device. Please try again.");
    }    
  };

  return (
    <div className="add-device-modal">
      <div className="modal-content">
        <h3>Add New Device</h3>

        {/* Account Number */}
        <label>
          Account Number:
          <input
            type="text"
            name="accountNumber"
            value={newDevice.accountNumber}
            onChange={handleInputChange}
          />
        </label>

        {/* Account Type */}
        <label>
          Account Type:
          <select
            name="accountType"
            value={newDevice.accountType}
            onChange={handleInputChange}
          >
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </select>
        </label>

        {/* Account Name */}
        <label>
          Account Name:
          <input
            type="text"
            name="accountName"
            value={newDevice.accountName}
            onChange={handleInputChange}
          />
        </label>

        {/* Device Number */}
        <label>
          Device Number:
          <input
            type="number"
            name="deviceNumber"
            value={newDevice.deviceNumber}
            onChange={handleInputChange}
          />
        </label>

        {/* Device Type */}
        <label>
          Device Type:
          <select
            name="deviceType"
            value={newDevice.deviceType}
            onChange={handleInputChange}
          >
            <option value="">Select Device Type</option>
            <option value="Hypervisor">Hypervisor</option>
            <option value="Server">Server</option>
            <option value="NA">NA</option>
          </select>
        </label>

        {/* Device Model */}
        <label>
          Device Model:
          <input
            type="text"
            name="deviceModel"
            value={newDevice.deviceModel}
            onChange={handleInputChange}
          />
        </label>

        {/* Status */}
        <label>
          Status:
          <select
            name="status"
            value={newDevice.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Running">Running</option>
            <option value="Stopped">Stopped</option>
            <option value="NA">NA</option>
          </select>
        </label>

        {/* Data Center */}
        <label>
          Data Center:
          <input
            type="text"
            name="dataCenter"
            value={newDevice.dataCenter}
            onChange={handleInputChange}
          />
        </label>

        {/* Hostname */}
        <label>
          Hostname:
          <input
            type="text"
            name="hostname"
            value={newDevice.hostname}
            onChange={handleInputChange}
          />
        </label>

        <div className="form-btn-container">
          <button onClick={handleSubmit}>Add New Device</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddDeviceModal;
