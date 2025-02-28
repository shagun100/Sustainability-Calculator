import { useState } from "react";
import Header from "../auth/Header/Header";
import AddDeviceModal from "./AddDeviceModal";
import DeviceTable from "./DeviceTable";
import OIP from "../../assets/OIP.jpg";
import CustomerList from "./CustomerList";
import axios from "axios";

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

type EmissionData = {
  data?: {
    deviceDTOList?: {
      accountName: string;
      minPower: number;
      maxPower: number;
      deviceNumber: string;
      deviceType: string;
      deviceModel: string;
      emissionFactor: number;
      totalMinEmission: number;
      totalMaxEmission: number;
    }[];
  };
};

const DashboardContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [deviceData, setDeviceData] = useState<Device[]>([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showDeviceTable, setShowDeviceTable] = useState(false);
  const [emissionData, setEmissionData] = useState<EmissionData>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddDeviceClick = () => {
    setShowModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/device/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload file");
      }

      const result = response.data;
      setEmissionData(result);
      setShowBulkModal(false);

      setShowDeviceTable(true); 

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  
  
  

  const generateReport = (data: Device[]) => {
    setShowCustomerModal(false);
    setDeviceData(data);
    setShowDeviceTable(true);
  };

  return (
    <div className="dashboard-content">
      <Header />
      <div className="banner">
        <img src={OIP} alt="Rackspace Banner" className="logo" />
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
              <input type="file" accept=".csv" onChange={handleFileUpload} />
              {selectedFile && <p>Selected File: {selectedFile.name}</p>}
              <div className="form-btn-container">
                <button onClick={() => setShowBulkModal(false)}>Close</button>
                <button onClick={handleSubmitFile} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="add-device-btn" onClick={() => setShowCustomerModal(true)}>
          Calculate Emission
        </button>
      </div>

      {showDeviceTable && <DeviceTable deviceData={deviceData} />}

      {showModal && (
        <AddDeviceModal
          closeModal={() => setShowModal(false)}
          setDeviceData={setDeviceData}
          deviceData={deviceData}
        />
      )}

      <CustomerList
        showCustomerModal={showCustomerModal}
        setShowCustomerModal={setShowCustomerModal}
        generateReport={generateReport}
        deviceData={deviceData}
        setEmissionData={setEmissionData}
      />

      {emissionData?.data?.deviceDTOList && emissionData.data.deviceDTOList.length > 0 && (
        <div className="device-table">
          <table>
            <thead>
              <tr>
                <th>Account Name</th>
                <th>Min Power</th>
                <th>Max Power</th>
                <th>Device Number</th>
                <th>Device Type</th>
                <th>Device Model</th>
                <th>Emission Factor</th>
                <th>Total Minimum Emission</th>
                <th>Total Maximum Emission</th>
              </tr>
            </thead>
            <tbody>
              {emissionData?.data?.deviceDTOList?.map((device, index) => (
                <tr key={index}>
                  <td>{device.accountName}</td>
                  <td>{device.minPower}</td>
                  <td>{device.maxPower}</td>
                  <td>{device.deviceNumber}</td>
                  <td>{device.deviceType}</td>
                  <td>{device.deviceModel}</td>
                  <td>{device.emissionFactor}</td>
                  <td>{Number(device.totalMinEmission).toFixed(2)}</td>
                  <td>{Number(device.totalMaxEmission).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>

            {/* Sum Row */}
            <tfoot>
              <tr className="total-row">
                <td colSpan={7} style={{ fontWeight: "bold", textAlign: "right" }}>
                  Total:
                </td>
                <td style={{ fontWeight: "bold" }}>
                  {Number(
                    emissionData.data?.deviceDTOList?.reduce(
                      (sum, device) => sum + parseFloat(device.totalMinEmission as unknown as string),
                      0
                    )
                  ).toFixed(2)}
                </td>
                <td style={{ fontWeight: "bold" }}>
                  {Number(
                    emissionData.data?.deviceDTOList?.reduce(
                      (sum, device) => sum + parseFloat(device.totalMaxEmission as unknown as string),
                      0
                    )
                  ).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardContainer;
