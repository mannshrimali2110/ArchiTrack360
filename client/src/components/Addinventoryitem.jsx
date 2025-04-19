import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInventoryItem } from '../redux/inventory/inventorySlice';

export default function AddInventoryItem() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await dispatch(addInventoryItem({
                name,
                quantity: Number(quantity),
                price: Number(price)
            }));

            setName('');
            setQuantity('');
            setPrice('');
            setSuccess('✅ Item added successfully!');
        } catch (err) {
            console.error('Error adding item:', err);
            setError('❌ Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: '100vh',
                backgroundColor: '#e7ecf5',
                color: '#1c2a3a',
            }}
        >
            <div className="w-100" style={{ maxWidth: '600px' }}>
                <div
                    className="p-5 rounded shadow-sm"
                    style={{
                        backgroundColor: '#f5f9ff',
                        borderLeft: '8px solid #3b5b92',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 className="mb-4 text-center fw-bold" style={{ color: '#1c2a3a' }}>
                        🧱 Add Inventory Item
                    </h3>

                    {success && (
                        <div className="alert alert-success text-center fw-medium">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger text-center fw-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">Item Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{
                                    backgroundColor: '#dfe9f3',
                                    color: '#1c2a3a',
                                    border: '1px solid #aac4e4',
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label fw-semibold">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                style={{
                                    backgroundColor: '#dfe9f3',
                                    color: '#1c2a3a',
                                    border: '1px solid #aac4e4',
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="form-label fw-semibold">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                style={{
                                    backgroundColor: '#dfe9f3',
                                    color: '#1c2a3a',
                                    border: '1px solid #aac4e4',
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
                            {loading ? '⏳ Adding...' : '➕ Add Item'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
