import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";

interface Device {
  name: string;
}

interface DeviceTableProps {
  deviceData: Device[];
}

const DeviceTable: React.FC<DeviceTableProps> = ({ deviceData }) => {
  const devices: Device[] = deviceData; // Use the passed deviceData
console.log('devicesdevicesdevices', devices);
  return (
    <div className="device-table">
      {devices.length === 0 ? (
        <p>Start adding devices to get them listed here.</p>
      ) : (
        <TableContainer variant="outlined">
            <Table aria-label="demo table">
            <TableHead>
                <TableRow>
                    <TableCell>Device Name</TableCell>
                    <TableCell>Device Model</TableCell>
                    <TableCell>Device Vendor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                devices?.map((deviceList, index) => {
                    return (
                        <TableRow>
                            <TableCell>{deviceList?.name}</TableCell>
                            <TableCell>{deviceList?.model}</TableCell>
                            <TableCell>{deviceList?.vendor}</TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
            </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DeviceTable;
