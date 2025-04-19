import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('sales');
  const [report, setReport] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
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
    doc.addImage(logo, 'PNG', 14, 10, 50, 20);
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
    <div className="container mt-5" style={{ maxWidth: '950px', backgroundColor: '#f5faff', padding: '30px', borderRadius: '10px' }}>
      <h2 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
        📄 Generate Report
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="reportType" className="form-label fw-semibold">📊 Report Type</label>
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
            <label htmlFor="startDate" className="form-label fw-semibold">📅 Start Date</label>
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
            <label htmlFor="endDate" className="form-label fw-semibold">📅 End Date</label>
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
        <div className="text-center mt-2">
          <button type="submit" className="btn btn-primary px-4">
            <i className="bi bi-file-earmark-bar-graph me-2"></i>Generate Report
          </button>
        </div>
      </form>

      {/* Report Table or No Data Message */}
      {report.length > 0 ? (
        <div className="card shadow p-4 mt-4">
          <h4 className="text-center mb-4">📈 Report Results</h4>
          <div className="text-center mb-3">
            <button className="btn btn-success" onClick={downloadPDF}>
              <i className="bi bi-file-earmark-arrow-down me-2"></i>Download PDF
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
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
        isSubmitted && (
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
