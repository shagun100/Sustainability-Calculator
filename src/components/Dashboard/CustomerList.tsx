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
import React, { useState } from "react";
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

export default CustomerList;


