import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSuppliers,
  deleteSupplier,
  setSelectedSupplier,
} from '../redux/supplier/supplierSlice';
import Notification from './Notification';
import DeleteModal from './DeleteModal';

const ManageSuppliers = () => {
  const dispatch = useDispatch();
  const { suppliers, isLoading, error } = useSelector(
    (state) => state.supplier
  );

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setDebouncedFilter(filter.trim());
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, filter]);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteSupplier(supplierToDelete._id));
      setNotification('Supplier deleted successfully!');
      setShowDeleteModal(false);
      setSupplierToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification(`Failed to delete supplier: ${err.message || 'Unknown error'}`);
      setShowDeleteModal(false);
      setSupplierToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleEdit = (id) => {
    const supplier = suppliers.find((s) => s._id === id);
    if (supplier) {
      dispatch(setSelectedSupplier(supplier));
      navigate(`/dashboard/suppliers/edit/${id}`);
    }
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.supplierName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()) &&
      supplier.supplyProducts
        .toLowerCase()
        .includes(debouncedFilter.toLowerCase())
  );

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: '1000px',
        backgroundColor: '#f5faff',
        padding: '30px',
        borderRadius: '10px',
      }}
    >
      <h2 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
        🗂️ Manage Suppliers
      </h2>

      {notification && <Notification message={notification} type="success" />}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName="supplier"
      />

      <div className="d-flex flex-column align-items-center mb-4">
        <input
          type="text"
          className="form-control mb-3 w-75"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: '#e1ebf7',
            borderColor: '#aac4e4',
            color: '#1c2a3a',
          }}
        />
        <input
          type="text"
          className="form-control w-75"
          placeholder="🧾 Filter by products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            backgroundColor: '#e1ebf7',
            borderColor: '#aac4e4',
            color: '#1c2a3a',
          }}
        />
      </div>

      <div className="text-center mb-4">
        <Link
          to="/dashboard/suppliers/add"
          className="btn fw-bold"
          style={{
            backgroundColor: '#3b5b92',
            borderColor: '#2e4975',
            color: '#ffffff',
            padding: '10px 20px',
            letterSpacing: '0.5px',
          }}
        >
          ➕ Add New Supplier
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : filteredSuppliers.length === 0 ? (
        <p className="text-center">No suppliers found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark text-center">
              <tr>
                <th><i className="bi bi-person-lines-fill me-2"></i>Supplier Name</th>
                <th><i className="bi bi-telephone-fill me-2"></i>Phone</th>
                <th><i className="bi bi-envelope-fill me-2"></i>Email</th>
                <th><i className="bi bi-geo-alt-fill me-2"></i>Address</th>
                <th><i className="bi bi-box-seam me-2"></i>Supply Products</th>
                <th><i className="bi bi-cash-stack me-2"></i>Payment Terms</th>
                <th><i className="bi bi-tools me-2"></i>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.supplyProducts}</td>
                  <td>{supplier.paymentTerms}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(supplier._id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(supplier)}
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
  );
};

export default ManageSuppliers;
