import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'; // Ensure the path is correct
import Signup from './components/Signup'; // Ensure the path is correct
import Dashboard from './components/Dashboard'; // Ensure the path is correct
import AddInventoryItem from './components/AddInventoryItem'; // Ensure the path is correct
import ManageInventory from './components/ManageInventory'; // Ensure the path is correct
import './App.css';
import AddEmployee from './components/AddEmployee';
import ManageEmployee from './components/ManageEmployee';
import AddSalesRecord from './components/AddSalesRecord';
import ManageSales from './components/ManageSales';
import AddSupplier from './components/AddSupplier';
import ManageSuppliers from './components/ManageSuppliers';
import AddOrder from './components/AddOrder';
import ManageOrders from './components/ManageOrders';
import Settings from './components/Settings'; 
import AboutUs from './pages/AboutUs';
import EditSupplier from './components/EditSuppliers';
import GenerateReport from './components/GenerateReport'; // Import GenerateReport
import ViewOrders from './components/ViewOrders'; // Import ViewOrders
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/inventory/add"
          element={
            <DashboardLayout>
              <AddInventoryItem />
            </DashboardLayout>
          }
        />
        <Route
          path="/manage-inventory"
          element={
            <DashboardLayout>
              <ManageInventory />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/employee/add"
          element={
            <DashboardLayout>
              <AddEmployee />
            </DashboardLayout>
          }
        />
        <Route
          path="/manage-employee"
          element={
            <DashboardLayout>
              <ManageEmployee />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/sales/add"
          element={
            <DashboardLayout>
              <AddSalesRecord />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/sales/manage"
          element={
            <DashboardLayout>
              <ManageSales />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/suppliers/add"
          element={
            <DashboardLayout>
              <AddSupplier />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/suppliers/manage"
          element={
            <DashboardLayout>
              <ManageSuppliers />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/orders/add"
          element={
            <DashboardLayout>
              <AddOrder />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/orders/manage"
          element={
            <DashboardLayout>
              <ManageOrders />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <DashboardLayout>
              <AboutUs />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/suppliers/edit/:id"
          element={
            <DashboardLayout>
              <EditSupplier />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/sales/report"
          element={
            <DashboardLayout>
              <GenerateReport />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/orders/view"
          element={
            <DashboardLayout>
              <ViewOrders />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
