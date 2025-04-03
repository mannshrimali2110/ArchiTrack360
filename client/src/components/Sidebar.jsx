import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

function Sidebar() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isSuppliersOpen, setIsSuppliersOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const toggleInventoryDropdown = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  const toggleEmployeeDropdown = () => {
    setIsEmployeeOpen(!isEmployeeOpen);
  };

  const toggleSalesDropdown = () => {
    setIsSalesOpen(!isSalesOpen);
  };

  const toggleSuppliersDropdown = () => {
    setIsSuppliersOpen(!isSuppliersOpen);
  };

  const toggleOrdersDropdown = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">


      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <Link to="/dashboard" className="nav-link text-white d-flex align-items-center">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>

        {/* Inventory Dropdown */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start"
            onClick={toggleInventoryDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-boxes me-2"></i> Inventory
            <i className={`bi ${isInventoryOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>

          {isInventoryOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/inventory/add" className="nav-link text-white">
                  Add Inventory
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/manage-inventory" className="nav-link text-white">
                  Manage Inventory
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Employee Management Dropdown */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start"
            onClick={toggleEmployeeDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-people me-2"></i> Employee Management
            <i className={`bi ${isEmployeeOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isEmployeeOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/employee/add" className="nav-link text-white">
                  Add Employee
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/manage-employee" className="nav-link text-white">
                  Manage Employees
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Sales Management Dropdown */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start"
            onClick={toggleSalesDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-bar-chart me-2"></i> Sales Management
            <i className={`bi ${isSalesOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isSalesOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/sales/add" className="nav-link text-white">
                  Add Sales Record
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/sales/manage" className="nav-link text-white">
                  Manage Sales
                </Link>
              </li>
              {/* <li className="nav-item mb-2">
                <Link to="/dashboard/sales/report" className="nav-link text-white">
                  Generate Report
                </Link>
              </li> */}
            </ul>
          )}
        </li>

        {/* Suppliers Management Dropdown */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start"
            onClick={toggleSuppliersDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-truck me-2"></i> Suppliers Management
            <i className={`bi ${isSuppliersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isSuppliersOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/suppliers/add" className="nav-link text-white">
                  Add Supplier
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/suppliers/manage" className="nav-link text-white">
                  Manage Suppliers
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Orders Management Dropdown */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white d-flex align-items-center bg-dark border-0 w-100 text-start"
            onClick={toggleOrdersDropdown}
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-cart me-2"></i> Orders Management
            <i className={`bi ${isOrdersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isOrdersOpen && (
            <ul className="nav flex-column ms-3">
              <li className="nav-item mb-2">
                <Link to="/dashboard/orders/add" className="nav-link text-white">
                  Add Order
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/orders/manage" className="nav-link text-white">
                  Manage Orders
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/dashboard/orders/view" className="nav-link text-white">
                  View Orders
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Setting
        <li className="nav-item mb-3">
          <Link to="/dashboard/settings" className="nav-link text-white d-flex align-items-center">
            <i className="bi bi-gear me-2"></i> Settings
          </Link>
        </li> */}

          <li className="nav-item mb-3">
            <Link to="/dashboard/sales/report" className="nav-link text-white">
              <i className="bi bi-boxes me-2"></i>
              Generate Report
            </Link>
          </li>

      </ul>
    </div>
  );
}

export default Sidebar;
