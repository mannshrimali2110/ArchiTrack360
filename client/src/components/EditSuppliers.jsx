// components/EditSupplier.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers, updateSupplier, addSupplier } from '../redux/supplier/supplierSlice';

const EditSupplier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { suppliers } = useSelector((state) => state.supplier);

    const [supplier, setSupplier] = useState({
        supplierName: '',
        phone: '',
        email: '',
        address: '',
        supplyProducts: '',
        paymentTerms: ''
    });

    useEffect(() => {
        if (id) {
            const existingSupplier = suppliers.find((s) => s._id === id);
            if (existingSupplier) {
                setSupplier(existingSupplier);
            } else {
                dispatch(fetchSuppliers());
            }
        }
    }, [id, suppliers, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await dispatch(updateSupplier({ id, supplier }));
            } else {
                await dispatch(addSupplier(supplier));
            }
            navigate('/dashboard/suppliers/manage'); // Redirect to ManageSuppliers after successful update
        } catch (error) {
            console.error('Error saving supplier:', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '1000px', backgroundColor: '#f5faff', padding: '30px', borderRadius: '10px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold" style={{ color: '#1c2a3a' }}>
                    {id ? '✏️ Edit Supplier' : '➕ Add New Supplier'}
                </h2>
                <div className="form-type-badge px-3 py-1" style={{ 
                    backgroundColor: '#3b5b92', 
                    color: 'white', 
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                }}>
                    {id ? 'Edit Form' : 'Add Form'}
                </div>
            </div>

            <div className="form-container p-4" style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Supplier Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="supplierName"
                            value={supplier.supplierName}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#e1ebf7',
                                borderColor: '#aac4e4',
                                color: '#1c2a3a',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={supplier.phone}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#e1ebf7',
                                borderColor: '#aac4e4',
                                color: '#1c2a3a',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={supplier.email}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#e1ebf7',
                                borderColor: '#aac4e4',
                                color: '#1c2a3a',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={supplier.address}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#e1ebf7',
                                borderColor: '#aac4e4',
                                color: '#1c2a3a',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Supply Products</label>
                        <input
                            type="text"
                            className="form-control"
                            name="supplyProducts"
                            value={supplier.supplyProducts}
                            onChange={handleChange}
                            required
                            style={{
                                backgroundColor: '#e1ebf7',
                                borderColor: '#aac4e4',
                                color: '#1c2a3a',
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">Payment Terms</label>
                        <input
                            type="text"
                            className="form-control"
                            name="paymentTerms"
                            value={supplier.paymentTerms}
                            onChange={handleChange}
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
                            {id ? '💾 Update Supplier' : '➕ Add Supplier'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary fw-bold"
                            onClick={() => navigate('/dashboard/suppliers/manage')}
                        >
                            ❎ Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSupplier;
