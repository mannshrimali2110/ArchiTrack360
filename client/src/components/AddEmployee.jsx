import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../redux/employee/employeeSlice';

export default function AddEmployee() {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const newEmployee = {
                name,
                department,
                email,
                userId: currentUser.user.id,
            };

            console.log('Dispatching addEmployee with:', newEmployee);

            await dispatch(addEmployee(newEmployee)).unwrap();
            setName('');
            setDepartment('');
            setEmail('');
            setSuccessMessage('Employee added successfully!');
            setErrorMessage('');

        } catch (error) {
            console.error('Error adding employee:', error);
            setErrorMessage(error.message || 'Failed to add employee. Please try again.');
            setSuccessMessage('');

        }

    }

    return (
        <div className="container mt-4">
            <h3>Add New Employee</h3>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
        </div>
    )
}
