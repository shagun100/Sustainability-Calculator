import { useState } from "react";
import Header from "../auth/Header/Header";
import AddDeviceModal from "./AddDeviceModal";
import DeviceTable from "./DeviceTable";
import OIP from '../../assets/OIP.jpg';
import CustomerList from "./CustomerList";

export type Device = {
    id: number;
    name: string;
    status: string;
    model: string;
    vendor: string;
    minPower: number;
    maxPower: number;
    uptime: string;
};

const DashboardContainer = () => {
    const [showModal, setShowModal] = useState(false);
    const [deviceData, setDeviceData] = useState<Device[]>([]);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showDeviceTable, setShowDeviceTable] = useState(false); 
    const [emissionData, setEmissionData] = useState<{ data?: { deviceDTOList?: any[] } }>({});
    const handleAddDeviceClick = () => {
        setShowModal(true);
    };

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [isUploading, setIsUploading] = useState(false);

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedFile(file);
    }
};

const handleSubmitFile = async () => {
    if (!selectedFile) {
        alert("Please select a file first.");
        return;
    }

    if (!selectedAccountNumber) {  // Ensure AccountNumber is selected
        alert("Please select an Account Number.");
        return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("accountNumber", selectedAccountNumber); // Include AccountNumber

    try {
        const response = await fetch("YOUR_BACKEND_UPLOAD_API", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

        const result = await response.json();
        console.log("Emission Data:", result);
        setEmissionData(result); // Store emission data to show in the table
        setShowBulkModal(false); // Close modal after success
    } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed. Please try again.");
    } finally {
        setIsUploading(false);
    }
};

    

    const parseCSVToDevices = (csvData: string): Device[] => {
        const lines = csvData.split('\n');
        const devices: Device[] = [];
        
        // Skip header row and process each line
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                try {
                    const [name, model, vendor, minPower, maxPower] = line.split(',').map(item => item.trim());
                    
                    // Validate the data
                    if (!name || !model || !vendor || isNaN(Number(minPower)) || isNaN(Number(maxPower))) {
                        console.error(`Invalid data in line ${i + 1}`);
                        continue;
                    }

                    devices.push({
                        id: Date.now() + i,
                        name,
                        status: 'Active',
                        model,
                        vendor,
                        minPower: parseInt(minPower),
                        maxPower: parseInt(maxPower),
                        uptime: '0'
                    });
                } catch (error) {
                    console.error(`Error processing line ${i + 1}:`, error);
                }
            }
        }
        return devices;
    };

    const generateReport = (data) => {
        setShowCustomerModal(false);
        setDeviceData(data);
        setShowDeviceTable(true);
        // const report = deviceData.map(device => {
        //     const hours = parseInt(device.uptime);
        //     const avgPower = (device.minPower + device.maxPower) / 2000; // Convert to kW
        //     const kWh = avgPower * hours;
        //     const co2Factor = 0.5; // kg CO2 per kWh
        //     const emissions = kWh * co2Factor;
        //     return {
        //         ...device,
        //         emissions: emissions.toFixed(2)
        //     };
        // });
        // console.log('Emissions Report:', report);
    };
    
    return (
        <div className="dashboard-content">
            <Header />
            <div className="banner">
                <img src={OIP} alt="Rackspace Banner" className="logo"/>
                <button className="add-device-btn" onClick={handleAddDeviceClick}>
                    + Add New Device
                </button>
                <button className="add-device-btn" onClick={() => setShowBulkModal(true)}>
                    + Add Bulk Devices
                </button>
                {showBulkModal && (
        <div className="add-bulk-modal">
            <div className="bulk-modal-content">
                <h3>Upload Bulk Devices</h3>
                <input type="file" accept=".csv" onChange={handleFileUpload} />
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}

            <div className="form-btn-container">
                <button onClick={() => setShowBulkModal(false)}>Close</button>
                <button onClick={handleSubmitFile} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Submit"}
                </button>
            </div>
        </div>
    </div>
)}
   
                <button className="add-device-btn" onClick={() => setShowCustomerModal(true)}>
                    Get Customer Ids
                </button>
            </div>
            <div>
                {
                    showDeviceTable && <DeviceTable deviceData={deviceData}/>
                }
            </div>
            {
                showModal && 
                    <AddDeviceModal
                        closeModal={() => setShowModal(false)}
                        setDeviceData={setDeviceData} 
                        deviceData={deviceData}
                    />
            }
            {
                <CustomerList 
                    showCustomerModal={showCustomerModal}
                    setShowCustomerModal={setShowCustomerModal}
                    generateReport={generateReport}
                    deviceData={deviceData}
                    setEmissionData={setEmissionData}
                />
            }
            {
                Object.keys(emissionData).length ?   
                <div className="device-table">
                <table>
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Min Power</th>
                      <th>Max Power</th>
                      <th>Device Number</th>
                      <th>Device Type</th>
                      <th>Device Model</th>
                      <th>Emission Factor</th>
                      <th>Total Minimum Emission</th>
                      <th>Total Maximum Emission</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    emissionData?.data?.deviceDTOList?.map((device, index) => {
                        return (
                        <tr key={index}>
                            <td>{device.accountName}</td>
                            <td>{device.minPower}</td>
                            <td>{device.maxPower}</td>
                            <td>{device.deviceNumber}</td>
                            <td>{device.deviceType}</td>
                            <td>{device.deviceModel}</td>
                            <td>{device.emissionFactor}</td>
                            <td>{device.totalMinEmission}</td>
                            <td>{device.totalMaxEmission}</td>
                        </tr>)})
                    }
                  </tbody>
                </table>
              </div> : null
            }
        </div>
    );
};

export default DashboardContainer;



