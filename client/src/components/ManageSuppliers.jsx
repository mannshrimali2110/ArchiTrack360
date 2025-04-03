// components/ManageSuppliers.js
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers, deleteSupplier, setSelectedSupplier } from '../redux/supplier/supplierSlice';

const ManageSuppliers = () => {
  const dispatch = useDispatch();
  const { suppliers, isLoading, error } = useSelector((state) => state.supplier);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const navigate = useNavigate();

  // Debounce input to reduce API calls
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setDebouncedFilter(filter.trim());
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [search, filter]);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(deleteSupplier(id));
  };

  const handleEdit = (id) => {
    const supplier = suppliers.find((supplier) => supplier._id === id);
    if (supplier) {
      dispatch(setSelectedSupplier(supplier));
      navigate(`/dashboard/suppliers/edit/${id}`);
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
    supplier.supplyProducts.toLowerCase().includes(debouncedFilter.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Manage Suppliers</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by products..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Link to="/dashboard/suppliers/add" className="btn btn-primary mb-3">Add New Supplier</Link>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : filteredSuppliers.length === 0 ? (
        <p>No suppliers found</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Supply Products</th>
              <th>Payment Terms</th>
              <th>Actions</th>
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
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(supplier._id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(supplier._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageSuppliers;
