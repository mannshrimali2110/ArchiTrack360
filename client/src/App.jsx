import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'; // Ensure the path is correct
import Signup from './components/Signup'; // Ensure the path is correct
import Dashboard from './components/Dashboard'; // Ensure the path is correct
import Sidebar from './components/Sidebar'; // Ensure the path is correct
import Navbar from './components/Navbar'; // Ensure the path is correct
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
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <Dashboard />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/inventory/add"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <AddInventoryItem />
              </div>
            </>
          }
        />
        <Route
          path="/manage-inventory"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <ManageInventory />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/employee/add"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <AddEmployee />
              </div>
            </>
          }
        />
        <Route
          path="/manage-employee"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <ManageEmployee />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/sales/add"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <AddSalesRecord />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/sales/manage"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <ManageSales />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/suppliers/add"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <AddSupplier />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/suppliers/manage"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <ManageSuppliers />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/orders/add"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <AddOrder />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/orders/manage"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <ManageOrders />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <Settings />
              </div>
            </>
          }
        />
        <Route
          path="/aboutus"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <AboutUs />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/suppliers/edit/:id"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <EditSupplier />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/sales/report"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <GenerateReport />
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/orders/view"
          element={
            <>
              <Navbar />
              <div className="app-container">
                <Sidebar />
                <ViewOrders />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
