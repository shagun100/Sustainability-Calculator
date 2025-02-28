import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./SystemData.css";
const SystemData = () => {
  const [data, setData] = useState([
    { id: 1, model: "Model A", dataCenter: "DC-1", type: "Server" },
    { id: 2, model: "Model B", dataCenter: "DC-2", type: "Router" },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({ model: "", dataCenter: "", type: "" });

  const openModal = (record = null) => {
    setEditingRecord(record);
    setFormData(record ? { ...record } : { model: "", dataCenter: "", type: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleSave = () => {
    if (editingRecord) {
      setData((prevData) =>
        prevData.map((item) => (item.id === editingRecord.id ? { ...formData, id: item.id } : item))
      );
    } else {
      setData((prevData) => [...prevData, { ...formData, id: prevData.length + 1 }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>Device Model</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr><th>Model</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td>{record.model}</td>
              <td>
                <button onClick={() => openModal(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openModal()}>Add Model</button>

      <h2>Device Type</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr><th>Type</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td>{record.type}</td>
              <td>
                <button onClick={() => openModal(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openModal()}>Add Type</button>

      <h2>Data Center</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr><th>Data Center</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td>{record.dataCenter}</td>
              <td>
                <button onClick={() => openModal(record)}>Edit</button>
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openModal()}>Add Data Center</button>

      {isModalOpen && (
        <div className="modal">
          <h3>{editingRecord ? "Edit Data" : "Add Data"}</h3>
          <input
            type="text"
            placeholder="Device Model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />
          <input
            type="text"
            placeholder="Device Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Data Center"
            value={formData.dataCenter}
            onChange={(e) => setFormData({ ...formData, dataCenter: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SystemData;
