import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png'; // Assuming the logo is stored in the assets folder

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('sales'); // Default report type
  const [report, setReport] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
  const baseUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Correct for Vite

  // Helper function to get the token
  const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return { Authorization: `Bearer ${token}` };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set to true when the form is submitted
    try {
      const response = await axios.get(`${baseUrl}/api/reports/${reportType}-report`, {
        headers: getAuthHeader(),
        params: { startDate, endDate },
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add logo and website name
    const imgWidth = 50; // Adjust as needed
    const imgHeight = 20; // Adjust as needed
    doc.addImage(logo, 'PNG', 14, 10, imgWidth, imgHeight);
    doc.text('ArchiTrack 360', 70, 20);

    doc.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, 14, 40);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 47);

    const tableColumn = Object.keys(report[0] || {}).map((key) => key.toUpperCase());
    const tableRows = report.map(item => Object.values(item));

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });

    doc.save(`${reportType}_report_${startDate}_to_${endDate}.pdf`);
  };

  return (
    <div className="container mt-3"> {/* Reduced margin-top from mt-5 to mt-3 */}
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Generate Report</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="reportType" className="form-label">Report Type</label>
              <select
                id="reportType"
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Sales</option>
                <option value="employees">Employees</option>
                <option value="suppliers">Suppliers</option>
                <option value="orders">Orders</option>
                <option value="inventory">Inventory</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Generate Report</button>
          </div>
        </form>
      </div>

      {report.length > 0 ? (
        <div className="card shadow mt-5 p-4">
          <h4 className="text-center mb-4">Report Results</h4>
          <div className="text-center mb-3">
            <button className="btn btn-success" onClick={downloadPDF}>Download PDF</button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  {Object.keys(report[0] || {}).map((key) => (
                    <th key={key}>{key.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        isSubmitted && ( // Show "No Data Found" only if the form has been submitted
          <div className="card shadow mt-5 p-4 text-center">
            <h4 className="mb-4 text-danger">
              <i className="bi bi-exclamation-circle"></i> No Data Found
            </h4>
            <p className="text-muted">Please adjust the date range or select a different report type.</p>
          </div>
        )
      )}
    </div>
  );
};

export default GenerateReport;