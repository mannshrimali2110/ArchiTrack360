// src/components/ManageSales.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales, deleteSale } from '../redux/sales/salesSlice';
import Notification from './Notification';

const ManageSales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const { items: sales, isLoading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sale record?')) {
      dispatch(deleteSale(id));
      setNotification('Sale record deleted successfully!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5" style={{ backgroundColor: '#e9f0f7', minHeight: '100vh' }}>
      <div className="p-5 rounded shadow" style={{ backgroundColor: '#f4f9ff' }}>
        <h3 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
          🧾 Manage Sales Records
        </h3>

        {notification && <Notification message={notification} />}

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by customer or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: '#e1ebf7',
              borderColor: '#aac4e4',
              color: '#1c2a3a',
            }}
          />
        </div>

        {/* Table Header */}
        <div className="d-flex justify-content-between align-items-center mb-2 px-2">
          <h5 className="text-dark fw-semibold mb-0">📋 Sales Record List</h5>
          <span className="badge bg-primary">
            Total: {filteredSales.length}
          </span>
        </div>

        {/* Table Display */}
        {isLoading ? (
          <div className="text-center text-muted">⏳ Loading sales records...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">❌ Error: {error}</div>
        ) : filteredSales.length === 0 ? (
          <div className="text-center text-muted">No matching sales records found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>👤 Customer</th>
                  <th>📦 Product</th>
                  <th>🔢 Quantity</th>
                  <th>💰 Price</th>
                  <th>📅 Date</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale._id}>
                    <td>{sale.customerName}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.quantity}</td>
                    <td>₹{sale.price}</td>
                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(sale._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSales;
