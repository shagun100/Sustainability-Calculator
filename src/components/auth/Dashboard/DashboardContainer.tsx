import { useState } from "react";
import Header from "../Header/Header";
import AddDeviceModal from "./AddDeviceModal";
import DeviceTable from "./DeviceTable";
import OIP from '../../../assets/OIP.jpg';

type Device = {
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

    const handleAddDeviceClick = () => {
        setShowModal(true);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    }

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
                {
                    showBulkModal && (
                        <div className="add-bulk-modal">
                            <div className="bulk-modal-content">
                                <h3>Upload Bulk Devices</h3>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls,.csv,.pdf"
                                    onChange={handleFileUpload}
                                />
                                <div className="form-btn-container">
                                    <button onClick={() => setShowBulkModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )
                }   
            </div>
            <div>
                <DeviceTable deviceData={deviceData}/>
            </div>
            {showModal && 
                <AddDeviceModal
                    closeModal={() => setShowModal(false)}
                    setDeviceData={setDeviceData} 
                    deviceData={deviceData}
                />
            }
        </div>
        
    )
    
};

export default DashboardContainer;