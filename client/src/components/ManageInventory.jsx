// src/components/ManageInventory.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchInventory,
  deleteInventoryItem,
  updateInventoryItem,
} from '../redux/inventory/inventorySlice';

const ManageInventory = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.inventory);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteInventoryItem(id));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateInventoryItem({ id: editItem._id, item: editItem }));
    setEditItem(null);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5" style={{ backgroundColor: '#e9f0f7', minHeight: '100vh' }}>
      <div className="p-5 rounded shadow" style={{ backgroundColor: '#f4f9ff' }}>
        <h3 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
          🏗️ Manage Inventory
        </h3>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            backgroundColor: '#e1ebf7',
            borderColor: '#aac4e4',
            color: '#1c2a3a',
          }}
        />

        {isLoading ? (
          <div className="text-center text-muted">⏳ Loading...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-muted">No items found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => setEditItem(item)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
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

        {editItem && (
          <form onSubmit={handleUpdate} className="mt-5">
            <h4 className="fw-bold mb-4 text-center" style={{ color: '#1c2a3a' }}>
              ✏️ Edit Item
            </h4>

            <div className="mb-3">
              <label className="form-label fw-semibold">Item Name</label>
              <input
                type="text"
                className="form-control"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
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
                value={editItem.quantity}
                onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
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
                value={editItem.price}
                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                required
                style={{
                  backgroundColor: '#e1ebf7',
                  borderColor: '#aac4e4',
                  color: '#1c2a3a',
                }}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn fw-bold"
                style={{
                  backgroundColor: '#3b5b92',
                  borderColor: '#2e4975',
                  color: '#ffffff',
                }}
              >
                💾 Update
              </button>
              <button
                type="button"
                className="btn btn-secondary fw-bold"
                onClick={() => setEditItem(null)}
              >
                ❎ Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageInventory;
