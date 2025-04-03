import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/order/orderSlice'; 
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h2 className="mb-4">View Orders</h2>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Customer or Product"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Loading and Error Handling */}
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Orders Table */}
      {!loading && !error && (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price ($)</th>
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
      )}
    </div>
  );
};

export default ViewOrders;
