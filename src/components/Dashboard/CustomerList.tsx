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
import React, { useState } from "react";

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

const CustomerList: React.FC<CustomerListProps> = ({ showCustomerModal, setShowCustomerModal, generateReport }) => {
  
  const staticCustomers = [
    { customerId: 2, customerName: "ABC comp", customerNumber: "001" },
    { customerId: 3, customerName: "XYZ comp", customerNumber: "002" },
    { customerId: 4, customerName: "DEF corp", customerNumber: "003" },
    { customerId: 5, customerName: "GHI Ltd", customerNumber: "004" }
  ];

  const hypervisorModels = ["VMware ESXi", "Microsoft Hyper-V", "Citrix XenServer"];
  const serverModels = ["HP DL range G8", "HP DL range G9", "Dell R720", "Dell R740"];
  
  const [selectedType, setSelectedType] = useState<string>(""); // Rackspace Internal / External
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Hypervisor / Server
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<{ from: string; to: string }>({ from: "", to: "" });

  const [showCustomers, setShowCustomers] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showDevices, setShowDevices] = useState(false);

  const handleCustomerChange = (customerId: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId) ? prev.filter(id => id !== customerId) : [...prev, customerId]
    );
  };

  const handleDeviceChange = (device: string) => {
    setSelectedDevices((prev) =>
      prev.includes(device) ? prev.filter(d => d !== device) : [...prev, device]
    );
  };

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

        {/* Customers Section */}
        <div className="modal-section">
          <button className="toggle-btn" onClick={() => setShowCustomers(!showCustomers)}>
            Select Account(s) {showCustomers ? "▲" : "▼"}
          </button>
          {showCustomers && (
            <div className="dropdown-content">
              {staticCustomers.map((customer) => (
                <label key={customer.customerId} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.customerId)}
                    onChange={() => handleCustomerChange(customer.customerId)}
                  />
                  <p>{`${customer.customerName} (${customer.customerNumber})`}</p>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Hypervisor or Server Selection */}
        <div className="modal-section">
          <label>Select Device Category:</label>
          <select className="dropdown-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="hypervisor">Hypervisor</option>
            <option value="server">Server</option>
          </select>
        </div>

        {/* Device Type Section */}
        <div className="modal-section">
          <button className="toggle-btn" onClick={() => setShowDevices(!showDevices)}>
            Select Device Model(s) {showDevices ? "▲" : "▼"}
          </button>
          {showDevices && (
            <div className="dropdown-content">
              {(selectedCategory === "hypervisor" ? hypervisorModels : serverModels).map((device, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device)}
                    onChange={() => handleDeviceChange(device)}
                  />
                  {device}
                </label>
              ))}
            </div>
          )}
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
          <button className="modal-btn generate-btn" onClick={() => generateReport(selectedType, selectedCustomers, selectedCategory, selectedDevices, timeRange)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;





