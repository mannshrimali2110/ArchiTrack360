import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, deleteOrder, updateOrder } from '../redux/order/orderSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from './Notification';
import DeleteModal from './DeleteModal';

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { data: orders, loading: isLoading, error } = useSelector((state) => state?.order);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      console.log('Dispatching fetchOrders...'); // Debugging log
      dispatch(fetchOrders());
    }
  }, [dispatch, orders]); // Fetch orders only if not already fetched

  useEffect(() => {
    if (orders) {
      console.log('Orders updated:', orders);
    }
    console.log('Loading status:', isLoading);
    if (error) {
      console.error('Error fetching orders:', error);
    }
  }, [orders, isLoading, error]);

  // Debugging fetchOrders dispatch
  console.log('fetchOrders action dispatched');

  const handleUpdate = () => {
    const updatedPayload = {
      id: selectedOrder._id,
      item: updatedOrder, // Ensure the payload matches the expected structure in the slice
    };

    dispatch(updateOrder(updatedPayload))
      .unwrap()
      .then(() => {
        alert('Order updated successfully');
      })
      .catch((error) => {
        alert(`Failed to update order: ${error.message}`);
      });
    setModalShow(false);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setUpdatedOrder({
      customerName: order.customerName,
      productName: order.productName,
      quantity: order.quantity,
      price: order.price,
    });
    setModalShow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteOrder(orderToDelete._id));
      setNotification('Order deleted successfully!');
      setShowDeleteModal(false);
      setOrderToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification(`Failed to delete order: ${err.message || 'Unknown error'}`);
      setShowDeleteModal(false);
      setOrderToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredOrders = (orders || []).filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm) ||
    order.productName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '1000px', backgroundColor: '#f5faff', padding: '30px', borderRadius: '10px' }}>
      <h2 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
        🗂️ Manage Orders
      </h2>

      {notification && <Notification message={notification} type="success" />}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName="order"
      />

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Customer or Product"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Customer Name</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price ($)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}</td>
                  <td>
                    <div className="mb-3 d-flex gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditClick(order)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(order)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {isLoading ? 'Loading orders...' : 'No orders found'} {/* Improved message */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      <div className={`modal ${modalShow ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalShow ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Order</h5>
              <button type="button" className="close" aria-label="Close" onClick={() => setModalShow(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customerName"
                    value={updatedOrder.customerName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={updatedOrder.productName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={updatedOrder.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={updatedOrder.price}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="mb-3">
                <button type="button" className="btn btn-secondary"
                  onClick={() => setModalShow(false)}
                >Close
                </button>
              </div>
              <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
