// src/components/ManageEmployee.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import Notification from './Notification';
import {
  fetchEmployees,
  updateEmployee,
  deleteEmployee,
} from '../redux/employee/employeeSlice';

const ManageEmployee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', department: '', email: '' });
  const [notification, setNotification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.employee?.employees);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (!currentUser || !currentUser.user) {
    return (
      <div className="alert alert-danger text-center my-5">
        ❌ User not authenticated. Please log in to manage employees.
      </div>
    );
  }

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = (employee) => {
    setEditingEmployee(employee._id);
    setFormData({
      name: employee.name,
      department: employee.department,
      email: employee.email,
    });
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteEmployee(employeeToDelete._id)).unwrap();
      setNotification('Employee deleted successfully!');
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    } catch {
      setNotification('Failed to delete employee');
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateEmployee({ id: editingEmployee, data: formData })).unwrap();
      setEditingEmployee(null);
      setFormData({ name: '', department: '', email: '' });
    } catch {
      alert('❌ Failed to update employee');
    }
  };

  const filteredEmployees = employees?.filter((employee) =>
    [employee.name, employee.department, employee.email]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-5" style={{ maxWidth: '1000px', backgroundColor: '#f5faff', padding: '30px', borderRadius: '10px' }}>
      <h2 className="text-center fw-bold mb-4" style={{ color: '#1c2a3a' }}>
        👥 Manage Employees
      </h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search by name, department, or email"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          backgroundColor: '#e1ebf7',
          borderColor: '#aac4e4',
          color: '#1c2a3a',
        }}
      />

      {notification && <Notification message={notification} type="success" />}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        itemName="employee"
      />

      {filteredEmployees?.length ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={employee._id || index}>
                  <td>{employee.name || '--'}</td>
                  <td>{employee.department || '--'}</td>
                  <td>{employee.email || '--'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(employee)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteClick(employee)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">No employees found.</div>
      )}

      {editingEmployee && (
        <form onSubmit={handleUpdate} className="mt-5">
          <h4 className="fw-bold mb-4 text-center" style={{ color: '#1c2a3a' }}>
            ✏️ Edit Employee
          </h4>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
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
            <label className="form-label fw-semibold">Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={formData.department}
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
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
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
              💾 Update
            </button>
            <button
              type="button"
              className="btn btn-secondary fw-bold"
              onClick={() => {
                setEditingEmployee(null);
                setFormData({ name: '', department: '', email: '' });
              }}
            >
              ❎ Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageEmployee;
