import { useState } from "react";
import Header from "../Header/Header";
import AddDeviceModal from "./AddDeviceModal";
import DeviceTable from "./DeviceTable";
import OIP from '../../../assets/OIP.jpg';
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
    const handleAddDeviceClick = () => {
        setShowModal(true);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const csvData = event.target?.result as string;
                    const devices = parseCSVToDevices(csvData);
                    setDeviceData(prev => [...prev, ...devices]);
                    setShowBulkModal(false);
                } catch (error) {
                    console.error('Error parsing CSV:', error);
                    alert('Error parsing CSV file. Please check the file format.');
                }
            };
            reader.readAsText(file);
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
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                            />
                            <div className="form-btn-container">
                                <button onClick={() => setShowBulkModal(false)}>Close</button>
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
                />
            }
        </div>
    );
};

export default DashboardContainer;



