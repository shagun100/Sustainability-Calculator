import React from 'react';
import { Device } from '../../Dashboard/DashboardContainer';

interface EmissionReportProps {
    devices: Device[];
}

const EmissionReport: React.FC<EmissionReportProps> = ({ devices }) => {
    const calculateCO2 = (device: Device) => {
        const hours = parseInt(device.uptime);
        const avgPower = (device.minPower + device.maxPower) / 2000; // Convert to kW
        const kWh = avgPower * hours;
        const co2Factor = 0.5; // kg CO2 per kWh
        return kWh * co2Factor;
    };

    const totalEmissions = devices.reduce((total, device) => {
        return total + calculateCO2(device);
    }, 0);

    return (
        <div className="emissions-report">
            <h2 className="text-xl font-bold mb-4">CO2 Emissions Report</h2>
            <div className="report-grid">
                {devices.map(device => {
                    const emissions = calculateCO2(device);
                    return (
                        <div key={device.id} className="report-card">
                            <h3>{device.name}</h3>
                            <p>Model: {device.model}</p>
                            <p>Vendor: {device.vendor}</p>
                            <p>Uptime: {device.uptime}</p>
                            <p>Power Range: {device.minPower}W - {device.maxPower}W</p>
                            <p className="emissions">
                                CO2 Emissions: {emissions.toFixed(2)} kg CO2
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="total-emissions">
                <h3>Total CO2 Emissions</h3>
                <p>{totalEmissions.toFixed(2)} kg CO2</p>
            </div>
        </div>
    );
};

export default EmissionReport;