// src/components/AddSalesRecord.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSale } from '../redux/sales/salesSlice';

const AddSalesRecord = () => {
  const [sale, setSale] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...sale,
        quantity: parseInt(sale.quantity, 10),
        price: parseFloat(sale.price),
      };

      await dispatch(addSale(payload));
      setMessage({ type: 'success', text: '✅ Sale record added successfully!' });

      setSale({
        customerName: '',
        productName: '',
        quantity: '',
        price: '',
      });
    } catch (err) {
      console.error('Error adding sale record:', err);
      setMessage({ type: 'error', text: '❌ Failed to add sale record. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#e9f0f7' }}
    >
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <div
          className="p-5 rounded shadow"
          style={{
            backgroundColor: '#f4f9ff',
            borderLeft: '6px solid #3b5b92',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          }}
        >
          <h3 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
            🧾 Add Sales Record
          </h3>

          {message.text && (
            <div
              className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} text-center fw-medium`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={sale.customerName}
                onChange={(e) => setSale({ ...sale, customerName: e.target.value })}
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
                value={sale.productName}
                onChange={(e) => setSale({ ...sale, productName: e.target.value })}
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
                value={sale.quantity}
                onChange={(e) => setSale({ ...sale, quantity: e.target.value })}
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
                value={sale.price}
                onChange={(e) => setSale({ ...sale, price: e.target.value })}
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
              {loading ? '⏳ Adding Sale...' : '📤 Submit Sale'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSalesRecord;
