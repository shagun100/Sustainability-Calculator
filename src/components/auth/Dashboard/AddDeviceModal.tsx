import React, { useState } from "react";

interface Device {
    name: string;
    model: string;
    vendor: string;
    minPower: number;
    maxPower: number;
    uptime: string;
}

interface AddDeviceModalProps {
    closeModal: () => void;
    setDeviceData: (data: any) => void;
    deviceData: Device[];
  }

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ closeModal, setDeviceData, deviceData }) => {

    const [newDevice, setNewDevice] = useState<Device>({
        name: "",
        model: "",
        vendor: "",
        minPower: 0,
        maxPower: 0,
        uptime: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewDevice((prevDevice) => ({
            ...prevDevice,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        setDeviceData([...deviceData, newDevice]);
        closeModal(); // Close modal after submission
    };

    return (
        <div className="add-device-modal">
            <div className="modal-content">
                <h3>Add New Device</h3>
                <label>
                    Device Name:
                    <input
                        type="text"
                        name="name"
                        value={newDevice.name}
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
                    Min Power Consumption:
                    <input
                        type="number"
                        name="minPower"
                        value={newDevice.minPower}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Max Power Consumption:
                    <input
                        type="number"
                        name="maxPower"
                        value={newDevice.maxPower}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Uptime:
                    <input
                        type="text"
                        name="uptime"
                        value={newDevice.uptime}
                        onChange={handleInputChange}
                    />
                </label>
                <div className="form-btn-container">
                    <button onClick={handleSubmit}>Generate Report</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddDeviceModal;
