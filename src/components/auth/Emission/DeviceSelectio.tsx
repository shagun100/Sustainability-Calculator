import React from 'react';
import type { Device } from '../Dashboard/DashboardContainer';

interface DeviceSelectionProps {
    devices: Device[];
    onDeviceSelect: (deviceId: number) => void;
    selectedDeviceIds: number[];
}

const DeviceSelection: React.FC<DeviceSelectionProps> = ({ 
    devices, 
    onDeviceSelect, 
    selectedDeviceIds 
}) => {
    return (
        <div className="devices-container">
            <h2 className="text-xl font-bold mb-4">Available Devices</h2>
            <div className="device-list">
                {devices.map(device => (
                    <div 
                        key={device.id} 
                        className={`device-item ${selectedDeviceIds.includes(device.id) ? 'selected' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedDeviceIds.includes(device.id)}
                            onChange={() => onDeviceSelect(device.id)}
                        />
                        <span>{device.name}</span>
                        <span>{device.model}</span>
                        <span>{device.uptime}</span>
                        <span>{`${device.minPower}W - ${device.maxPower}W`}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceSelection;