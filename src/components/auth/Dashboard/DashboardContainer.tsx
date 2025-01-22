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

    const handleAddDeviceClick = () => {
        setShowModal(true);
    };

    return (
        <div className="dashboard-content">
            <Header />
            <div className="banner">
                <img src={OIP} alt="Rackspace Banner" className="logo"/>
                <button className="add-device-btn" onClick={handleAddDeviceClick}>
                    + Add New Device
                </button>
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