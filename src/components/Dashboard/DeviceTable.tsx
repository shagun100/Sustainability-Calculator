import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React from "react";

interface Device {
  name: string;
  model: string;
  vendor: string;
  customerName: string;
  customerNumber: string;
  customerType: "Internal" | "External";
}

interface DeviceTableProps {
  deviceData: Device[];
}

const DeviceTable: React.FC<DeviceTableProps> = ({ deviceData }) => {
  return (
    <div className="device-table">
      {deviceData.length === 0 ? (
        <p>Start adding devices to get them listed here.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="device table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Device Name</strong></TableCell>
                <TableCell><strong>Device Model</strong></TableCell>
                <TableCell><strong>Device Vendor</strong></TableCell>
                <TableCell><strong>Customer Name</strong></TableCell>
                <TableCell><strong>Customer Number</strong></TableCell>
                <TableCell><strong>Customer Type</strong></TableCell>
                <TableCell><strong>CO2</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deviceData.map((device, index) => (
                <TableRow key={index}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.model}</TableCell>
                  <TableCell>{device.vendor}</TableCell>
                  <TableCell>{device.customerName}</TableCell> 
                  <TableCell>{device.customerNumber}</TableCell> 
                  <TableCell>{device.customerType}</TableCell>
                  <TableCell>23</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DeviceTable;
