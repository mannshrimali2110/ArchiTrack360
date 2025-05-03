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
        backgroundColor: '#cbd5e1', // dark teal
        borderColor: '#94a3b8',     // darker teal
        borderWidth: 1,
        hoverBackgroundColor: '#94a3b8', // medium-dark teal
        hoverBorderColor: '#0d5c54',
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
                      borderRadius: '10px',
                    }}
                  >
                    <Card.Body>
                      <Card.Title style={{ color: 'white', fontSize: '1.2rem' }}>
                        {['Total Orders', 'Total Suppliers', 'Total Inventory', 'Total Employees'][index]}
                      </Card.Title>
                      <Card.Text className="display-6" style={{ color: 'white', fontWeight: 'bold' }}>
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
                <h3 className="text-center mb-3" style={{ color: 'white' }}>Employees</h3>
                <Table
                  className="table table-striped table-dark table-bordered table-hover"
                  style={{ backgroundColor: '#2d3748', borderRadius: '10px' }}
                >
                  <thead>
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
                <h3 className="text-center mb-3" style={{ color: 'white' }}>Sales Overview</h3>
                <div
                  className="p-3"
                  style={{
                    backgroundColor: '#2d3748',
                    borderRadius: '10px',
                  }}
                >
                  <Bar
                    data={salesChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { labels: { color: 'white' } },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        x: {
                          ticks: { color: 'white' },
                          grid: { color: '#4a5568' },
                        },
                        y: {
                          ticks: { color: 'white' },
                          grid: { color: '#4a5568' },
                        },
                      },
                    }}
                  />
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
