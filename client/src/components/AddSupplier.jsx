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
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
      await dispatch(addSupplier({ ...supplier, userId })).unwrap();
      alert('Supplier added successfully');
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
      setError('Failed to add supplier. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            value={supplier.supplierName}
            onChange={(e) => setSupplier({ ...supplier, supplierName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={supplier.phone}
            onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={supplier.email}
            onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            value={supplier.address}
            onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Supply Products</label>
          <input
            type="text"
            className="form-control"
            value={supplier.supplyProducts}
            onChange={(e) => setSupplier({ ...supplier, supplyProducts: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Terms</label>
          <input
            type="text"
            className="form-control"
            value={supplier.paymentTerms}
            onChange={(e) => setSupplier({ ...supplier, paymentTerms: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Supplier'}
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
};

export default AddSupplier;
