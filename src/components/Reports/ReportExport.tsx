import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ReportExport.css";

const ReportExport: React.FC = () => {
  const exportToPDF = () => {
    const reportElement = document.getElementById("report-content");
    if (!reportElement) return;

    html2canvas(reportElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Energy_Report.pdf");
    });
  };

  const shareByEmail = () => {
    const subject = "Energy & Emissions Report";
    const body = "Attached is the latest energy report.";
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareOnSlack = () => {
    alert("Slack integration will be implemented here.");
  };

  return (
    <div className="report-export">
      <h2>📄 Export & Share</h2>
      <button onClick={exportToPDF}>Download PDF</button>
      <button onClick={shareByEmail}>Share via Email</button>
      <button onClick={shareOnSlack}>Share on Slack</button>
    </div>
  );
};

export default ReportExport;
