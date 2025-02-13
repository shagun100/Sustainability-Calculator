/*import React, { useState } from "react";
import axios from "axios"; // Import axios


interface CustomerListProps {
  showCustomerModal: false;
  setShowCustomerModal: () => void;
  generateReport: () => void;
  deviceData: [];
}

const CustomerList: React.FC<CustomerListProps> = ({ showCustomerModal, setShowCustomerModal, generateReport, deviceData}) => {

    const staticCustomers = [
        {
            "customerId": 2,
            "customerName": "ABC comp",
            "customerType": "customer",
            "customerNumber": "001"
        },
        {
            "customerId": 3,
            "customerName": "XYZ comp",
            "customerType": "customer",
            "customerNumber": "002"
        },
        {
            "customerId": 4,
            "customerName": "XYZ comp",
            "customerType": "customer",
            "customerNumber": "002"
        },
        {
            "customerId": 5,
            "customerName": "XYZ comp",
            "customerType": "customer",
            "customerNumber": "002"
        }
    ];

    if (!showCustomerModal) {
        return null;
    }
   
    return (
        <div className="customer-modal">
            <div className="customer-modal-content">
                <h2 className="modal-title">Select Customer</h2>
                <div className="customer-list">
                    {staticCustomers.map((customer, index) => (
                        <div key={index} className="customer-item">
                            {customer.customerNumber}
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="modal-btn close-btn" onClick={() => setShowCustomerModal(false)}>
                        Close
                    </button>
                    <button className="modal-btn generate-btn" onClick={() => generateReport(deviceData)}>
                        Generate CO2
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;*/
/*import React, { useState } from "react";
import axios from "axios";

interface CustomerListProps {
  showCustomerModal: false;
  setShowCustomerModal: () => void;
  generateReport: (selectedCustomers: any[]) => void; // Updated to pass selected customers
  deviceData: [];
}

const CustomerList: React.FC<CustomerListProps> = ({
  showCustomerModal,
  setShowCustomerModal,
  generateReport,
  deviceData,
}) => {
  const staticCustomers = [
    {
      customerId: 2,
      customerName: "ABC comp",
      customerType: "customer",
      customerNumber: "001",
    },
    {
      customerId: 3,
      customerName: "XYZ comp",
      customerType: "customer",
      customerNumber: "002",
    },
    {
      customerId: 4,
      customerName: "XYZ comp",
      customerType: "customer",
      customerNumber: "003",
    },
    {
      customerId: 5,
      customerName: "XYZ comp",
      customerType: "customer",
      customerNumber: "004",
    },
  ];

  // State for storing selected customers
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);

  const handleCheckboxChange = (customerId: number) => {
    setSelectedCustomers((prevSelectedCustomers) => {
      if (prevSelectedCustomers.includes(customerId)) {
        // Deselect customer
        return prevSelectedCustomers.filter((id) => id !== customerId);
      } else {
        // Select customer
        return [...prevSelectedCustomers, customerId];
      }
    });
  };

  if (!showCustomerModal) {
    return null;
  }

  return (
    <div className="customer-modal">
      <div className="customer-modal-content">
        <h2 className="modal-title">Select Customer(s)</h2>
        <div className="customer-list">
          {staticCustomers.map((customer, index) => (
            <div key={index} className="customer-item">
              <input
                type="checkbox"
                id={`customer-${customer.customerId}`}
                value={customer.customerId}
                checked={selectedCustomers.includes(customer.customerId)}
                onChange={() => handleCheckboxChange(customer.customerId)}
              />
              <label htmlFor={`customer-${customer.customerId}`}>
                {customer.customerName} ({customer.customerNumber})
              </label>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button
            className="modal-btn close-btn"
            onClick={() => setShowCustomerModal(false)}
          >
            Close
          </button>
          <button
            className="modal-btn generate-btn"
            onClick={() => generateReport(selectedCustomers)} // Pass selected customers
          >
            Generate CO2
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;*/
import React, { useState, useEffect } from "react";
import axios from "axios";

interface CustomerListProps {
  showCustomerModal: boolean;
  setShowCustomerModal: () => void;
  generateReport: (
    selectedType: string,
    selectedCustomers: number[],
    selectedCategory: string,
    selectedDevices: string[],
    timeRange: { from: string; to: string }
  ) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ showCustomerModal, setShowCustomerModal, generateReport, setEmissionData }) => {
interface Account {
  accountId: number;
  accountName: string;
  accountNumber: string;
}

const [accountList, setAccountList] = useState<Account[]>([]); // List of accounts
const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

interface DeviceType {
  id: number;
  name: string;
}

const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]); // Device types for selected account
const [selectedDeviceType, setSelectedDeviceType] = useState<number | null>(null);

interface DeviceModel {
  id: number;
  name: string;
}

const [deviceModels, setDeviceModels] = useState<DeviceModel[]>([]); // Device models for selected account
const [selectedDeviceModel, setSelectedDeviceModel] = useState<number | null>(null);

interface Data {
  totalMinEmission: number;
  totalMaxEmission: number;
  deviceDTOList: {
    deviceModel: string;
    hostname: string;
    minPower: number;
    maxPower: number;
    emissionFactor: number;
  }[];
}

const [Data, setData] = useState<Data | null>(null); // Store emission response

  /*const staticCustomers = [
    { customerId: 2, customerName: "ABC comp", customerNumber: "001" },
    { customerId: 3, customerName: "XYZ comp", customerNumber: "002" },
    { customerId: 4, customerName: "DEF corp", customerNumber: "003" },
    { customerId: 5, customerName: "GHI Ltd", customerNumber: "004" }
  ];*/

  const hypervisorModels = ["VMware ESXi", "Microsoft Hyper-V", "Citrix XenServer"];
  const serverModels = ["HP DL range G8", "HP DL range G9", "Dell R720", "Dell R740"];
  //Update Component State neeche wala code
  const [selectedType, setSelectedType] = useState<string>(""); // Rackspace Internal / External
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Hypervisor / Server
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<{ from: string; to: string }>({ from: "", to: "" });
  const [showCustomers, setShowCustomers] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDevices, setShowDevices] = useState(false);

  const handleCustomerChange = (customerId: number) => {
    setSelectedCustomers((prev) => {
      const isSelected = prev.includes(customerId);
      return isSelected ? prev.filter(id => id !== customerId) : [...prev, customerId];
    });
  };
  

  const handleDeviceChange = (device: string) => {
    setSelectedDevices((prev) =>
      prev.includes(device) ? prev.filter(d => d !== device) : [...prev, device]
    );
  };
  //Fetch and populate accounts neeche wala code
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/account");
        const data = await response.json();
        
        console.log("Fetched Accounts:", data); // Debugging step
  
        if (data.accountList) {
          setAccountList(data.accountList);  // Fix: Extract `accountList` from the response
        } else {
          setAccountList(data); // If it's already an array, set it directly
        }
  
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  //for fetching categories dynamically
  
  //Fetch Device Types on Account Selection neeche wala code
  const handleAccountSelect = async (accountId: number) => {
    setSelectedAccount(accountId);
    setSelectedDeviceType(null);
    setSelectedDeviceModel(null);
  
    try {
      // Fetch Device Types
      const typeResponse = await fetch(`http://localhost:8080/account/${accountId}/device-types`);
      const typeData = await typeResponse.json();
      setDeviceTypes(typeData || []);
  
      // Fetch Device Models
      const modelResponse = await fetch(`http://localhost:8080/account/${accountId}/device-models`);
      const modelData = await modelResponse.json();
      setDeviceModels(modelData || []);
  
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };
  
  

  //Fetch device models on device type selection
  const handleDeviceTypeSelect = async (deviceTypeId: number) => {
    setSelectedDeviceType(deviceTypeId);
    setSelectedDeviceModel(null); // Reset model selection
  
    if (!selectedAccount) return; // Fix: Prevent request if no account is selected
  
    try {
      const response = await fetch(`http://localhost:8080/account/${selectedAccount}/device-models`);
      const data = await response.json();
  
      console.log("Fetched Device Models:", data); // Debugging step
  
      setDeviceModels(data.deviceModels || data); // Fix: Handle response format
    } catch (error) {
      console.error("Error fetching device models:", error);
    }
  };
  
  
  //Submit emission calculation 
  const handleSubmit = async () => {
    if (!selectedAccount || !selectedDeviceType || !selectedDeviceModel) {
      alert("Please select all fields before submitting!");
      return;
    }
  
    const requestBody = {
      accountId: selectedAccount,
      deviceTypeId: selectedDeviceType,
      deviceModelId: selectedDeviceModel,
    };
  
    try {
      console.log("Request Body:", requestBody); 
      /*const response = await fetch("http://localhost:8080/emission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(requestBody),
      });*/
      const response = await axios.post("/emission", requestBody);
      if(response.status === 200) {
        alert("Successfully calculated emissions!");
        setShowCustomerModal(false);
        setEmissionData(response);
      }
      else{
        alert("Something went wrong!");

      }
      //const data = await response.json();
      
      //console.log("Emission Data:", data); // Debugging step
  
      setData(response.data || null); // Fix: Handle empty response safely
    } catch (error) {
      console.error("Error fetching emissions:", error);
    }
  };
  
  //Display kro
  /*console.log("Data:", Data);
  console.log("length:", Data?.deviceDTOList?.length);
  const data = JSON.stringify(Data, null);
  console.log(typeof data);*/

  {Data && Data.deviceDTOList?.length > 0 && (
  <div className="emission-results">
    <h3>Emission Data</h3>
    <p>Min Emission: {Data.totalMinEmission ?? 'N/A'}</p>
    <p>Max Emission: {Data.totalMaxEmission ?? 'N/A'}</p>
    
    <h4>Device Details</h4>
    {Data.deviceDTOList.map((device, index) => (
      <div key={index}>
        <p>Device: {device.deviceModel ?? 'Unknown'}</p>
        <p>Hostname: {device.hostname ?? 'N/A'}</p>
        <p>Min Power: {device.minPower ? `${device.minPower}W` : 'N/A'}</p>
        <p>Max Power: {device.maxPower ? `${device.maxPower}W` : 'N/A'}</p>
        <p>Emission Factor: {device.emissionFactor ?? 'N/A'}</p>
      </div>
    ))}
  </div>
)}

  
  
  

  console.log('accountListaccountListaccountList', accountList);
  
  if (!showCustomerModal) return null;
  return (
    <div className="customer-modal">
      <div className="customer-modal-content">
        <h3 className="modal-title">Calculate Emission</h3>

        {/* Rackspace Type Selection */}
        <div className="modal-section">
          <label>Select Rackspace Type:</label>
          <select className="dropdown-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="internal">Rackspace Internal</option>
            <option value="external">Rackspace External</option>
          </select>
        </div>

        {/* Account selection */}
        {/* <div className="modal-section">
  <label>Select Account:</label>
  <select value={selectedAccount ?? ""} onChange={(e) => handleAccountSelect(Number(e.target.value))}> 
    <option value="">-- Select Account --</option>
    {accountList.map((account) => (
      <option key={account.accountId} value={account.accountId}>
        {account.accountName} ({account.accountNumber})
      </option>
    ))}
  </select>
</div> */}
<div className="modal-section">
  <label>Select Account:</label>
  <select value={selectedAccount ?? ""} onChange={(e) => handleAccountSelect(Number(e.target.value))}> 
    <option value="">-- Select Account --</option>
    {accountList.map((account) => (
      <option key={account.accountId} value={account.accountId}>
        {account.accountName} ({account.accountNumber})
      </option>
    ))}
  </select>
</div>


        
        {/* Hypervisor or Server Selection */}
        
        <div className="modal-section">
          <label>Select Device Type:</label>
          <select value={selectedDeviceType ?? ""} onChange={(e) => handleDeviceTypeSelect(Number(e.target.value))}>
            <option value="">-- Select Device Type --</option>
            {deviceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Device model Section */}
    
        <div className="modal-section">
          <label>Select Device Model:</label>
          <select value={selectedDeviceModel ?? ""} onChange={(e) => setSelectedDeviceModel(Number(e.target.value))}>
            <option value="">-- Select Device Model --</option>
            {deviceModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Time Range Selection */}
        <div className="modal-section date-range-container">
          <label className="date-range-label">From:</label>
          <input 
            type="date" 
            className="date-input"
            value={timeRange.from} 
            onChange={(e) => setTimeRange({ ...timeRange, from: e.target.value })} 
          />

          <label className="date-range-label">To:</label>
          <input 
            type="date" 
            className="date-input"
            value={timeRange.to} 
            onChange={(e) => setTimeRange({ ...timeRange, to: e.target.value })} 
          />
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-btn close-btn" onClick={() => setShowCustomerModal(false)}>Close</button>
          <button className="modal-btn generate-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;





