import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../redux/order/orderSlice';

const AddOrder = () => {
  const [order, setOrder] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await dispatch(addOrder(order));
      setSuccess('Order added successfully!');
      setOrder({
        customerName: '',
        productName: '',
        quantity: '',
        price: '',
      });
    } catch (err) {
      console.error('Error adding order:', err);
      setError('Failed to add order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-4 d-flex justify-content-center"
      style={{
        maxWidth: '750px',
        backgroundColor: '#f5faff',
        padding: '30px',
        borderRadius: '10px',
      }}
    >
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <div
          className="p-5 rounded shadow"
          style={{
            backgroundColor: '#f5f9ff',
            borderLeft: '8px solid #3b5b92',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
            📝 Add Order
          </h3>

          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2 fw-medium">
              <i className="bi bi-check-circle-fill fs-5 text-success"></i>
              {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 fw-medium">
              <i className="bi bi-exclamation-triangle-fill fs-5 text-danger"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={order.customerName}
                onChange={(e) =>
                  setOrder({ ...order, customerName: e.target.value })
                }
                required
                style={{
                  backgroundColor: '#e1ebf7',
                  borderColor: '#aac4e4',
                  color: '#1c2a3a',
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={order.productName}
                onChange={(e) =>
                  setOrder({ ...order, productName: e.target.value })
                }
                required
                style={{
                  backgroundColor: '#e1ebf7',
                  borderColor: '#aac4e4',
                  color: '#1c2a3a',
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={order.quantity}
                onChange={(e) =>
                  setOrder({ ...order, quantity: e.target.value })
                }
                required
                style={{
                  backgroundColor: '#e1ebf7',
                  borderColor: '#aac4e4',
                  color: '#1c2a3a',
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                className="form-control"
                value={order.price}
                onChange={(e) =>
                  setOrder({ ...order, price: e.target.value })
                }
                required
                style={{
                  backgroundColor: '#e1ebf7',
                  borderColor: '#aac4e4',
                  color: '#1c2a3a',
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold"
              disabled={loading}
              style={{
                backgroundColor: '#3b5b92',
                borderColor: '#2e4975',
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              {loading ? '⏳ Adding Order...' : '📤 Submit Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
