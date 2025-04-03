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
        <div className="container mt-5">
            <h2>{id ? 'Edit Supplier' : 'Add New Supplier'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Supplier Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="supplierName"
                        value={supplier.supplierName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={supplier.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={supplier.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={supplier.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Supply Products</label>
                    <input
                        type="text"
                        className="form-control"
                        name="supplyProducts"
                        value={supplier.supplyProducts}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Terms</label>
                    <input
                        type="text"
                        className="form-control"
                        name="paymentTerms"
                        value={supplier.paymentTerms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">
                    {id ? 'Update Supplier' : 'Add Supplier'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/dashboard/suppliers/manage')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditSupplier;
