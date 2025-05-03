import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSupplier } from '../redux/supplier/supplierSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddSupplier = () => {
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState({
    supplierName: '',
    phone: '',
    email: '',
    address: '',
    supplyProducts: '',
    paymentTerms: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const userId = localStorage.getItem('userId');
      await dispatch(addSupplier({ ...supplier, userId })).unwrap();
      setSuccess('✅ Supplier added successfully');
      setSupplier({
        supplierName: '',
        phone: '',
        email: '',
        address: '',
        supplyProducts: '',
        paymentTerms: '',
      });
    } catch (err) {
      console.error('Error adding supplier:', err);
      setError('❌ Failed to add supplier. Please try again.');
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
            backgroundColor: '#f5faff',
            borderLeft: '6px solid #3b5b92',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
          }}
        >
          <h3 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
            🧾 Add Supplier
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
            {[
              { label: 'Supplier Name', key: 'supplierName', type: 'text' },
              { label: 'Phone', key: 'phone', type: 'tel' },
              { label: 'Email', key: 'email', type: 'email' },
              { label: 'Address', key: 'address', type: 'text' },
              { label: 'Supply Products', key: 'supplyProducts', type: 'text' },
              { label: 'Payment Terms', key: 'paymentTerms', type: 'text' },
            ].map((field) => (
              <div className="mb-3" key={field.key}>
                <label className="form-label fw-semibold">{field.label}</label>
                <input
                  type={field.type}
                  className="form-control"
                  value={supplier[field.key]}
                  onChange={(e) =>
                    setSupplier({ ...supplier, [field.key]: e.target.value })
                  }
                  required
                  style={{
                    backgroundColor: '#e1ebf7',
                    borderColor: '#aac4e4',
                    color: '#1c2a3a',
                  }}
                />
              </div>
            ))}

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
              {loading ? '⏳ Adding Supplier...' : '📥 Add Supplier'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
