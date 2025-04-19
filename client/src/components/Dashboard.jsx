import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const baseUrl = import.meta.env.VITE_BACKEND_URL;

      const ordersResponse = await axios.get(`${baseUrl}/api/orders/`, config);
      setTotalOrders(ordersResponse.data.length);

      const suppliersResponse = await axios.get(`${baseUrl}/api/suppliers/`, config);
      setTotalSuppliers(suppliersResponse.data.length);

      const inventoryResponse = await axios.get(`${baseUrl}/api/inventory/`, config);
      setTotalInventory(inventoryResponse.data.length);

      const employeeCountResponse = await axios.get(`${baseUrl}/api/employees/count`, config);
      setTotalEmployees(employeeCountResponse.data.count);

      const employeesResponse = await axios.get(`${baseUrl}/api/employees/`, config);
      setEmployees(employeesResponse.data.employees);

      const salesResponse = await axios.get(`${baseUrl}/api/sales/monthly-sales`, config);
      const salesData = salesResponse.data.map((item) => ({
        month: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }),
        sales: item.sales,
      }));
      setSalesData(salesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message || error);
    }
  };

  const salesChartData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 123, 255, 0.8)',
        hoverBorderColor: 'rgba(0, 123, 255, 1)',
        data: salesData.map((data) => data.sales),
      },
    ],
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#1f2937', color: 'white', minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-10 offset-md-1" style={{ marginTop: '10px' }}>
          <div className="mt-4 px-3">
            <h1 className="text-center" style={{ color: 'white' }}>Admin Dashboard</h1>

            {/* Total Stats Boxes */}
            <div className="row mt-5">
              {[totalOrders, totalSuppliers, totalInventory, totalEmployees].map((total, index) => (
                <div className="col-md-3" key={index}>
                  <Card
                    className="custom-card text-center mb-4 shadow-sm"
                    style={{
                      backgroundColor: '#2d3748',
                      border: '2px solid white',
                    }}
                  >
                    <Card.Body>
                      <Card.Title style={{ color: 'white' }}>
                        {['Total Orders', 'Total Suppliers', 'Total Inventory', 'Total Employees'][index]}
                      </Card.Title>
                      <Card.Text className="display-6" style={{ color: 'white' }}>
                        {total !== undefined ? total : 'Loading...'}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            {/* Employee Table */}
            <div className="row mt-4">
              <div className="col-12">
                <h3 className="text-center" style={{ color: 'white' }}>Employees</h3>
                <Table
                  className="custom-table table-striped table-bordered table-hover mt-3"
                  style={{ backgroundColor: '#2d3748', color: 'white' }}
                >
                  <thead style={{ backgroundColor: '#2d3748', color: 'white' }}>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(employees) && employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>{employee.name}</td>
                        <td>{employee.department}</td>
                        <td>{employee.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="row mt-4">
              <div className="col-12">
                <h3 className="text-center" style={{ color: 'white' }}>Sales</h3>
                <div className="chart-container mt-3">
                  <Bar data={salesChartData} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
