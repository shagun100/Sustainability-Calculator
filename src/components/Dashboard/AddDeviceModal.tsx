import React, { useState } from "react";
import axios from "axios"; // Import axios

interface Device {
  name: string;
  model: string;
  vendor: string;
  customerName: string;
  customerNumber: string;
  customerType: "Internal" | "External";
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
    name: "",
    model: "",
    vendor: "",
    customerName: "",
    customerNumber: "",
    customerType: "Internal", // Default value
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log("Updating:", name, "Value:", value); // Debugging log
    setNewDevice((prevDevice) => ({
      ...prevDevice,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!newDevice.customerNumber.trim()) {
      alert("Customer Number is required!");
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
      console.error("There was an error adding the device:", error);
      alert("Failed to add the device. Please try again.");
    }
  };

  return (
    <div className="add-device-modal">
      <div className="modal-content">
      <input />
        <h3>Add New Device</h3>
        <label>
          Device Name:
          <input
            type="text"
            name="name"
            value={newDevice.name ?? ""}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Device Model:
          <input
            type="text"
            name="model"
            value={newDevice.model}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Device Vendor:
          <input
            type="text"
            name="vendor"
            value={newDevice.vendor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={newDevice.customerName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Customer Number (Required):
          <input
            type="text"
            name="customerNumber"
            value={newDevice.customerNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Customer Type:
          <select
            name="customerType"
            value={newDevice.customerType}
            onChange={handleInputChange}
          >
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </select>
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
