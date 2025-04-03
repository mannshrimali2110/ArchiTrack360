import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, updateEmployee, deleteEmployee } from '../redux/employee/employeeSlice';

export default function ManageEmployee() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', department: '', email: '' });

  const dispatch = useDispatch();
  const employees = useSelector((state) => state?.employee?.employees); // Access employees directly
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (!currentUser || !currentUser.user) {
    return (
      <div className="alert alert-danger">
        User not authenticated. Please log in to manage employees.
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee._id);
    setFormData({
      name: employee.name,
      department: employee.department,
      email: employee.email,
    });
  };
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEmployee(id)).unwrap();
      alert('Employee deleted successfully');
    } catch (error) {
      alert('Failed to delete employee');
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const id = editingEmployee;
      const data = {
        name: formData.name,
        department: formData.department,
        email: formData.email,
      };
      await dispatch(updateEmployee({ id, data })).unwrap(); // Ensure 'data' is passed correctly
      setEditingEmployee(null);
      setFormData({ name: '', department: '', email: '' });
    } catch (error) {
      alert('Failed to update employee');
    }
  };


  const filteredEmployees = employees?.filter((employee) =>
    [employee.name, employee.department, employee.email]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <h3>Manage Employees</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, department, or email"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredEmployees?.length ? (
        <table className="table table-bordered">
          <thead>
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
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No employees found.</div>
      )}

      {editingEmployee && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h4>Edit Employee</h4>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Employee</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingEmployee(null);
              setFormData({ name: '', department: '', email: '' });
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
