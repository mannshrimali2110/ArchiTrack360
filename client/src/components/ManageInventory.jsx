import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory, deleteInventoryItem, updateInventoryItem } from '../redux/inventory/inventorySlice';

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
        <div className="container mt-4">
            <h3>Manage Inventory</h3>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : filteredItems.length === 0 ? (
                <div>No items found</div>
            ) : (
                <table className="table table-bordered">
                    <thead>
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
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => setEditItem(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editItem && (
                <div className="edit-form mt-4">
                    <h4>Edit Item</h4>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor="editName" className="form-label">Item Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="editName"
                                value={editItem.name}
                                onChange={(e) =>
                                    setEditItem({ ...editItem, name: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editQuantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="editQuantity"
                                value={editItem.quantity}
                                onChange={(e) =>
                                    setEditItem({ ...editItem, quantity: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editPrice" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="editPrice"
                                value={editItem.price}
                                onChange={(e) =>
                                    setEditItem({ ...editItem, price: e.target.value })
                                }
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Update Item</button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => setEditItem(null)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageInventory;
