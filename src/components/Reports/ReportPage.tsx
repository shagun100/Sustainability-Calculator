import React, { useState } from "react";
import "./ReportPage.css";
import EnergyGauge from "./EnergyGauge";
import Co2Cloud from "./Co2Cloud";
import DeviceHeatmap from "./DeviceHeatmap";
import EnergyTrend from "./EnergyTrend";
import WhatIfSimulator from "./WhatIfSimulator";
import SmartRecommendations from "./SmartRecommendations";
import ReportExport from "./ReportExport"; // ✅ Imported Report Export

const ReportPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(null);

  // Sample Data for Dynamic Reports
  const reportSections = [
    {
      id: "energy-gauge",
      title: "🔋 Energy Gauge",
      component: <EnergyGauge energyUsage={75} />,
    },
    {
      id: "co2-cloud",
      title: "☁️ CO₂ Emissions",
      component: <Co2Cloud emissions={20} />,
    },
    {
      id: "device-heatmap",
      title: "📊 Device Heatmap",
      component: (
        <DeviceHeatmap
          devices={[
            { id: 1, name: "Server A", powerUsage: 300, location: { x: 10, y: 20 } },
            { id: 2, name: "Router B", powerUsage: 150, location: { x: 30, y: 50 } },
            { id: 3, name: "Switch C", powerUsage: 450, location: { x: 60, y: 30 } },
          ]}
        />
      ),
    },
    {
      id: "energy-trend",
      title: "📈 Energy Trends",
      component: (
        <EnergyTrend
          energyData={[
            { time: "10 AM", usage: 50 },
            { time: "11 AM", usage: 60 },
            { time: "12 PM", usage: 55 },
            { time: "1 PM", usage: 70 },
            { time: "2 PM", usage: 65 },
          ]}
        />
      ),
    },
    {
      id: "what-if-simulator",
      title: "⚙️ What-If Simulator",
      component: <WhatIfSimulator deviceCount={10} powerUsage={500} efficiency={80} />,
    },
    {
      id: "smart-recommendations",
      title: "🤖 Smart Recommendations",
      component: (
        <SmartRecommendations
          recommendations={[
            "Reduce server idle time by 20%.",
            "Upgrade to energy-efficient power supplies.",
            "Optimize cooling systems for better efficiency.",
          ]}
        />
      ),
    },
    {
      id: "report-export",
      title: "📄 Export & Share",
      component: <ReportExport />, // ✅ Added Report Export component
    },
  ];

  const openModal = (component: React.ReactNode) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  return (
    <div className="report-container">
      <h1 className="report-title">Energy & Emissions Report</h1>

      <div className="report-grid">
        {reportSections.map((section) => (
          <div key={section.id} className="report-card" onClick={() => openModal(section.component)}>
            {section.title}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {selectedComponent}
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
