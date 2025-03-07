import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js"; // Import Fuse.js for fuzzy search
import "./SystemData.css";

const SystemData = () => {
  const [activeTab, setActiveTab] = useState("models"); // Default tab
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  interface DataItem {
    id: number;
    name: string;
  }

  const [models, setModels] = useState<DataItem[]>([]);
  const [types, setTypes] = useState<DataItem[]>([]);
  const [dataCenters, setDataCenters] = useState<DataItem[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "" });
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const modelRes = await axios.get("/device-models");
      const typeRes = await axios.get("/device-types");
      const dataCenterRes = await axios.get("http://localhost:8080/data-centers");
      setModels(modelRes.data);
      setTypes(typeRes.data);
      setDataCenters(dataCenterRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const openModal = (type: string, data: { id?: number; name: string } | null = null) => {
    setModalType(type);
    setModalData(data ? { name: data.name } : { name: "" });
    setEditId(data && data.id !== undefined ? data.id : null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({ name: "" });
    setEditId(null);
  };

  const handleSave = async () => {
    try {
      const endpoint = activeTab === "dataCenters" ? "/data-centers" : `/device-${activeTab}`;
  
      if (modalType === "add") {
        const response = await axios.post(endpoint, { name: modalData.name });
  
        const newItem = { id: response.data.id, name: modalData.name };
        if (activeTab === "models") setModels([...models, newItem]);
        else if (activeTab === "types") setTypes([...types, newItem]);
        else setDataCenters([...dataCenters, newItem]); 
      } else if (modalType === "edit" && editId !== null) {
        await axios.patch(`${endpoint}/${editId}`, { name: modalData.name });
  
        if (activeTab === "models") {
          setModels(models.map(item => item.id === editId ? { ...item, name: modalData.name } : item));
        } else if (activeTab === "types") {
          setTypes(types.map(item => item.id === editId ? { ...item, name: modalData.name } : item));
        } else {
          setDataCenters(dataCenters.map(item => item.id === editId ? { ...item, name: modalData.name } : item));
        }
      }
  
      closeModal();
    } catch (error) {
      console.error("Error saving data", error);
    }
  };
  
  
  
  const handleDelete = async (id: number) => {
    try {
      let endpoint = "";
  
      // Ensure correct API endpoint for deletion
      if (activeTab === "models") {
        endpoint = `/device-models/${id}`;
        setModels(models.filter(item => item.id !== id)); // Remove from UI immediately
      } else if (activeTab === "types") {
        endpoint = `/device-types/${id}`;
        setTypes(types.filter(item => item.id !== id));
      } else if (activeTab === "dataCenters") {
        endpoint = `/data-centers/${id}`; // Ensure ID is included in the URL
        setDataCenters(dataCenters.filter(item => item.id !== id));
      } else {
        console.error("Invalid activeTab:", activeTab);
        return;
      }
  
      console.log(`Deleting from: ${endpoint}`); // Debugging
  
      const response = await axios.delete(endpoint);
      
      if (response.status === 200 || response.status === 204) {
        console.log("Delete successful");
      } else {
        console.warn("Unexpected delete response:", response);
      }
      
    } catch (error: any) {
      console.error("Error deleting data:", error.response?.data || error.message);
    }
  };
  
  
  
  

  // Get the correct data based on the active tab
  const getActiveData = () => {
    if (activeTab === "models") return Array.isArray(models) ? models : [];
    if (activeTab === "types") return Array.isArray(types) ? types : [];
    return Array.isArray(dataCenters) ? dataCenters : [];
  };
  
  

  // Fuzzy Search Setup
  const fuse = new Fuse(getActiveData(), {
    keys: ["name"],
    threshold: 0.3, // Lower values make the search stricter
  });

  // Apply search filter
  const filteredData = searchQuery.trim()
    ? fuse.search(searchQuery).map(result => result.item)
    : getActiveData();

  return (
    <div className="system-data-container">
      <h2>System Data</h2>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === "models" ? "active" : ""} onClick={() => { setActiveTab("models"); setSearchQuery(""); }}>Device Models</button>
        <button className={activeTab === "types" ? "active" : ""} onClick={() => { setActiveTab("types"); setSearchQuery(""); }}>Device Types</button>
        <button className={activeTab === "dataCenters" ? "active" : ""} onClick={() => { setActiveTab("dataCenters"); setSearchQuery(""); }}>Data Centers</button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {/* Data Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="button-group">
                  <button className="edit-btn" onClick={() => openModal("edit", item)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                  <button className="add-btn" onClick={() => openModal("add")}>+ Add {activeTab === "models" ? "Model" : activeTab === "types" ? "Type" : "Data Center"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <>
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal">
            <h3>{modalType === "edit" ? "Edit" : "Add"} {activeTab === "models" ? "Model" : activeTab === "types" ? "Type" : "Data Center"}</h3>
            <input
              type="text"
              placeholder="Enter name"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SystemData;
