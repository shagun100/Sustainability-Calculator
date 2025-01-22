import React, { useState } from 'react';

interface Device {
  name: string;
  model: string;
  vendor: string;
  power: number;
  uptime: number;
  co2: number;
}

interface AddDeviceFormProps {
  onAddDevice: (device: Device) => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ onAddDevice }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [vendor, setVendor] = useState('');
  const [power, setPower] = useState<number | string>('');
  const [uptime, setUptime] = useState<number | string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Calculate CO2 (You can replace this logic with your own formula)
    const calculatedCo2 = (parseFloat(power as string) * parseFloat(uptime as string)) / 1000; // Dummy calculation

    onAddDevice({
      name: deviceName,
      model: deviceModel,
      vendor: vendor,
      power: Number(power),
      uptime: Number(uptime),
      co2: calculatedCo2,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} placeholder="Name" required />
      <input type="text" value={deviceModel} onChange={(e) => setDeviceModel(e.target.value)} placeholder="Model" required />
      <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor" required />
      <input type="number" value={power} onChange={(e) => setPower(e.target.value)} placeholder="Power" required />
      <input type="number" value={uptime} onChange={(e) => setUptime(e.target.value)} placeholder="Uptime" required />
      <button type="submit">Add Device</button>
    </form>
  );
};

export default AddDeviceForm;