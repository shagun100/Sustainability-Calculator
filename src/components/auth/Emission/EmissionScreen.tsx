import React, { useState } from "react";
import Header from "../Header/Header";
import EmissionReport from "./EmissionReport";
import OIP from '../../../assets/OIP.jpg';
import { Device } from "../Dashboard/DashboardContainer";
import "./emission.css";
import DeviceSelection from "./DeviceSelectio";

interface EmissionScreenProps {
    onGenerateReport: (devices: Device[]) => void;
    selectedDevices: Device[];
    reportGenerated: boolean;
}

const EmissionScreen: React.FC<EmissionScreenProps> = ({
    onGenerateReport,
    selectedDevices,
    reportGenerated
}) => {
    const [devices] = useState<Device[]>([
        // This should be populated from your dashboard data
        // You'll need to implement data sharing between dashboard and emission screen
    ]);
    const [selectedDeviceIds, setSelectedDeviceIds] = useState<number[]>([]);

    const handleDeviceSelection = (deviceId: number) => {
        setSelectedDeviceIds(prev => 
            prev.includes(deviceId)
                ? prev.filter(id => id !== deviceId)
                : [...prev, deviceId]
        );
    };

    const handleGenerateReport = () => {
        const selectedDevicesList = devices.filter(device => 
            selectedDeviceIds.includes(device.id)
        );
        onGenerateReport(selectedDevicesList);
    };

    return (
        <div className="emission-screen">
            <Header />
            <div className="banner">
                <img src={OIP} alt="Rackspace Banner" className="logo"/>
                <button 
                    className="generate-report-btn"
                    onClick={handleGenerateReport}
                    disabled={selectedDeviceIds.length === 0}
                >
                    Generate CO2 Report
                </button>
            </div>
            
            <DeviceSelection
                devices={devices}
                onDeviceSelect={handleDeviceSelection}
                selectedDeviceIds={selectedDeviceIds}
            />

            {reportGenerated && selectedDevices.length > 0 && (
                <EmissionReport devices={selectedDevices} />
            )}
        </div>
    );
};

export default EmissionScreen;