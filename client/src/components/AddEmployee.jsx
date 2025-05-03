import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../redux/employee/employeeSlice';
import 'animate.css'; // Make sure this is installed

export default function AddEmployee() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const newEmployee = {
      name,
      department: role, // keeping the backend field as 'department'
      email,
      userId: currentUser.user.id,
    };

    try {
      console.log('Dispatching addEmployee with:', newEmployee);
      await dispatch(addEmployee(newEmployee)).unwrap();

      setName('');
      setRole('');
      setEmail('');
      setSuccess('Employee added successfully!');
    } catch (err) {
      console.error('Error adding employee:', err);
      setError('Failed to add employee. Please try again.');
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
            🏗️ Add New Employee
          </h3>

          {/* Alerts */}
          {success && (
            <div className="alert alert-success d-flex align-items-center gap-2 fw-medium">
              <i className="bi bi-check-circle-fill fs-5 text-success"></i>
              {success}
            </div>
          )}

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 fw-medium">
              <i className="bi bi-exclamation-triangle-fill fs-5 text-danger"></i>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
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
              <label className="form-label fw-semibold">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={{
                  backgroundColor: '#dfe9f3',
                  color: '#1c2a3a',
                  border: '1px solid #aac4e4',
                }}
              >
                <option value="">Select Role</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Procurement Officer">Procurement Officer</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Construction Manager">Construction Manager</option>
                <option value="Admin">Admin</option>
                <option value="Client">Client</option>
                <option value="Project Owner">Project Owner</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              style={{
                backgroundColor: '#3b5b92',
                borderColor: '#2e4975',
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
              disabled={loading}
            >
              ➕ Add Employee
            </button>
          </form>
        </div>
      </div>

      {/* Custom dropdown hover styling */}
      <style>
        {`
          select.form-select option:hover,
          select.form-select option:focus {
            background-color: #3b5b92 !important;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
