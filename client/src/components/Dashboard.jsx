import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

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
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const baseUrl = import.meta.env.VITE_BACKEND_URL;

      const [ordersRes, suppliersRes, inventoryRes, empCountRes, employeesRes, salesRes] = await Promise.all([
        axios.get(`${baseUrl}/api/orders/`, config),
        axios.get(`${baseUrl}/api/suppliers/`, config),
        axios.get(`${baseUrl}/api/inventory/`, config),
        axios.get(`${baseUrl}/api/employees/count`, config),
        axios.get(`${baseUrl}/api/employees/`, config),
        axios.get(`${baseUrl}/api/sales/monthly-sales`, config),
      ]);

      setTotalOrders(ordersRes.data.length);
      setTotalSuppliers(suppliersRes.data.length);
      setTotalInventory(inventoryRes.data.length);
      setTotalEmployees(empCountRes.data.count);
      setEmployees(employeesRes.data.employees);

      const formattedSales = salesRes.data.map((item) => ({
        month: new Date(0, item.month - 1).toLocaleString('default', { month: 'long' }),
        sales: item.sales,
      }));

      setSalesData(formattedSales);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message || error);
    }
  };

  const salesChartData = {
    labels: salesData.map((d) => d.month),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#3b5b92',
        borderColor: '#00649f',
        borderWidth: 1,
        hoverBackgroundColor: '#00dbe7',
        hoverBorderColor: '#00649f',
        data: salesData.map((d) => d.sales),
      },
    ],
  };

  return (
    <div className="min-h-screen from-[#38bcce] to-white overflow-y-auto font-sans px-6 py-10">
      <div className="sticky top-0 bg-[#cbd8ec] z-10 shadow-lg p-6 rounded-2xl mb-6">
        <h1 className="text-4xl font-bold text-[#00649f] text-center tracking-wide">Admin Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Orders', value: totalOrders },
          { label: 'Total Suppliers', value: totalSuppliers },
          { label: 'Total Inventory', value: totalInventory },
          { label: 'Total Employees', value: totalEmployees },
        ].map(({ label, value }, i) => (
          <div
            key={i}
            className="bg-[#cbd8ec] rounded-2xl shadow-lg p-6 transition-shadow duration-300 border border-[#00dbe7] flex flex-col items-center justify-center text-center hover:bg-[#00dbe7]"
          >
            <h3 className="text-xl text-[#00649f] mb-2">{label}</h3>
            <p className="text-5xl font-bold text-[#00649f]">{value ?? '...'}</p>
          </div>
        ))}
      </div>

      {/* Employees Table */}
      <div className="bg-[#cbd8ec] rounded-2xl shadow-lg p-6 mb-10 overflow-x-auto border border-[#00dbe7]">
        <h2 className="text-2xl font-semibold text-[#00649f] mb-4 text-center">Employees</h2>

        <table className="min-w-full text-left border-collapse border border-[#00dbe7]">
          <thead>
            <tr className="bg-[#01aac1] text-white font-semibold">
              <th className="px-6 py-3 border border-[#00dbe7]">Name</th>
              <th className="px-6 py-3 border border-[#00dbe7]">Department</th>
              <th className="px-6 py-3 border border-[#00dbe7]">Email</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(employees) && employees.map((employee) => (
              <tr
                key={employee._id}
                className="hover:bg-[#00dbe7] transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-semibold text-[#00649f] border border-[#00dbe7]">{employee.name}</td>
                <td className="px-6 py-4 text-sm text-[#00649f] border border-[#00dbe7]">{employee.department}</td>
                <td className="px-6 py-4 text-sm text-[#00649f] font-medium border border-[#00dbe7]">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Chart */}
      <div className="bg-[#cbd8ec] rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-[#00649f] mb-4 text-center">📈 Sales Overview</h2>
        <div className="max-w-4xl mx-auto">
          <Bar
            data={salesChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: '#00649f'
                  }
                }
              },
              scales: {
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    color: '#00649f'
                  }
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    borderDash: [2, 4],
                    color: '#00dbe7'
                  },
                  ticks: {
                    color: '#00649f'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;