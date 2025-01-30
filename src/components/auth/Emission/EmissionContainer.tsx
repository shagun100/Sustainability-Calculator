import { useState } from "react";
import EmissionScreen from "./EmissionScreen";
import { Device } from "../Dashboard/DashboardContainer"; // Assuming you have types defined here

const EmissionContainer = () => {
    // This container component will handle the state management and data flow
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const [reportGenerated, setReportGenerated] = useState(false);

    const handleGenerateReport = (devices: Device[]) => {
        setSelectedDevices(devices);
        setReportGenerated(true);
    };

    return (
        <EmissionScreen 
            onGenerateReport={handleGenerateReport}
            selectedDevices={selectedDevices}
            reportGenerated={reportGenerated}
        />
    );
};

export default EmissionContainer;