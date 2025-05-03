// src/components/ManageInventory.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './Notification';
import DeleteModal from './DeleteModal';
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
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteInventoryItem(itemToDelete._id));
      setNotification('Item deleted successfully!');
      setShowDeleteModal(false);
      setItemToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification(`Failed to delete item: ${err.message || 'Unknown error'}`);
      setShowDeleteModal(false);
      setItemToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateInventoryItem({ id: editItem._id, item: editItem }));
    window.alert('✅ Item updated successfully!');
    setEditItem(null);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '1000px', backgroundColor: '#f5faff', padding: '30px', borderRadius: '10px' }}>
      <h2 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
        🏗️ Manage Inventory
      </h2>

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

      {notification && <Notification message={notification} type="success" />}

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
                      onClick={() => handleDeleteClick(item)}
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

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName="inventory item"
      />

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
  );
};

export default ManageInventory;
