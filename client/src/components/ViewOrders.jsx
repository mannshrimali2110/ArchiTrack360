import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/order/orderSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewOrders = () => {
  const dispatch = useDispatch();
  const { data: orders, loading, error } = useSelector((state) => state?.order);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orders || []);
  }, [orders]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = orders?.filter(order =>
      order.customerName.toLowerCase().includes(value) ||
      order.productName.toLowerCase().includes(value)
    );

    setFilteredOrders(filtered || []);
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: '900px',
        backgroundColor: '#f5faff',
        padding: '30px',
        borderRadius: '10px',
      }}
    >
      <h2 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
        🧾 View Orders
      </h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <div className="input-group w-75">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Customer or Product"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              backgroundColor: '#e1ebf7',
              borderColor: '#aac4e4',
              color: '#1c2a3a',
            }}
          />
        </div>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">⏳ Loading orders...</p>}
      {error && <p className="text-danger text-center">❌ Error: {error}</p>}

      {/* Orders Table */}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark text-center">
              <tr>
                <th><i className="bi bi-person-lines-fill me-2"></i>Customer Name</th>
                <th><i className="bi bi-box-seam me-2"></i>Product Name</th>
                <th><i className="bi bi-box-fill me-2"></i>Quantity</th>
                <th><i className="bi bi-cash-stack me-2"></i>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order.customerName}</td>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
