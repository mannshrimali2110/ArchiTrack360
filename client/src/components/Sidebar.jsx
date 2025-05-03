import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isSuppliersOpen, setIsSuppliersOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const toggleDropdown = (setDropdown) => setDropdown((prevState) => !prevState);

  const activeSubLinkClass = ({ isActive }) =>
    `block w-full px-4 py-3 text-sm text-white transition-all duration-200 
    border-2 border-[#00dbe7] shadow-[0_0_0_1px_#00dbe7] rounded-md
    ${isActive ? 'bg-[#005792]' : 'hover:bg-[#005792]'}`;

  return (
    <div className="bg-[#00204a] text-white w-64 min-h-screen p-4 shadow-xl overflow-y-auto">
      <ul className="nav flex-col space-y-2">
        <li className="nav-item">
          <Link
            to="/dashboard"
            className="nav-link no-underline text-white bg-[#01aac1] hover:bg-[#00dbe7] focus:bg-[#00dbe7] flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <i className="bi bi-speedometer2 me-3"></i> Dashboard
          </Link>
        </li>

        {/* Inventory Dropdown */}
        <li className="nav-item">
          <button
            className={`nav-link text-white flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm w-full text-left font-medium
              ${isInventoryOpen ? 'bg-[#00dbe7]' : 'bg-[#01aac1] hover:bg-[#00dbe7]'}`}
            onClick={() => toggleDropdown(setIsInventoryOpen)}
          >
            <i className="bi bi-boxes me-3"></i> Inventory
            <i className={`bi ${isInventoryOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isInventoryOpen && (
            <ul className="nav flex-col mt-2 ms-2 bg-[#00204a] rounded-md shadow-inner p-2">
              <li className="nav-item mb-2">
                <NavLink
                  to="/dashboard/inventory/add"
                  className={activeSubLinkClass}
                >
                  Add Inventory
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/manage-inventory"
                  className={activeSubLinkClass}
                >
                  Manage Inventory
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Employee Management Dropdown */}
        <li className="nav-item">
          <button
            className={`nav-link text-white flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm w-full text-left font-medium
              ${isEmployeeOpen ? 'bg-[#00dbe7]' : 'bg-[#01aac1] hover:bg-[#00dbe7]'}`}
            onClick={() => toggleDropdown(setIsEmployeeOpen)}
          >
            <i className="bi bi-people me-3"></i> Employee Management
            <i className={`bi ${isEmployeeOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isEmployeeOpen && (
            <ul className="nav flex-col mt-1 ms-2 bg-[#00204a] rounded-md shadow-inner p-2 space-y-2">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/employee/add"
                  className={activeSubLinkClass}
                >
                  Add Employee
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/manage-employee"
                  className={activeSubLinkClass}
                >
                  Manage Employees
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Sales Management Dropdown */}
        <li className="nav-item">
          <button
            className={`nav-link text-white flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm w-full text-left font-medium
              ${isSalesOpen ? 'bg-[#00dbe7]' : 'bg-[#01aac1] hover:bg-[#00dbe7]'}`}
            onClick={() => toggleDropdown(setIsSalesOpen)}
          >
            <i className="bi bi-bar-chart me-3"></i> Sales Management
            <i className={`bi ${isSalesOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isSalesOpen && (
            <ul className="nav flex-col mt-1 ms-2 bg-[#00204a] rounded-md shadow-inner p-2 space-y-2">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/sales/add"
                  className={activeSubLinkClass}
                >
                  Add Sales Record
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/sales/manage"
                  className={activeSubLinkClass}
                >
                  Manage Sales
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Suppliers Management Dropdown */}
        <li className="nav-item">
          <button
            className={`nav-link text-white flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm w-full text-left font-medium
              ${isSuppliersOpen ? 'bg-[#00dbe7]' : 'bg-[#01aac1] hover:bg-[#00dbe7]'}`}
            onClick={() => toggleDropdown(setIsSuppliersOpen)}
          >
            <i className="bi bi-truck me-3"></i> Suppliers Management
            <i className={`bi ${isSuppliersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isSuppliersOpen && (
            <ul className="nav flex-col mt-1 ms-2 bg-[#00204a] rounded-md shadow-inner p-2 space-y-2">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/suppliers/add"
                  className={activeSubLinkClass}
                >
                  Add Supplier
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/suppliers/manage"
                  className={activeSubLinkClass}
                >
                  Manage Suppliers
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Orders Management Dropdown */}
        <li className="nav-item">
          <button
            className={`nav-link text-white flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm w-full text-left font-medium
              ${isOrdersOpen ? 'bg-[#00dbe7]' : 'bg-[#01aac1] hover:bg-[#00dbe7]'}`}
            onClick={() => toggleDropdown(setIsOrdersOpen)}
          >
            <i className="bi bi-cart me-3"></i> Orders Management
            <i className={`bi ${isOrdersOpen ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`}></i>
          </button>
          {isOrdersOpen && (
            <ul className="nav flex-col mt-1 ms-2 bg-[#00204a] rounded-md shadow-inner p-2 space-y-2">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/orders/add"
                  className={activeSubLinkClass}
                >
                  Add Order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/orders/manage"
                  className={activeSubLinkClass}
                >
                  Manage Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/orders/view"
                  className={activeSubLinkClass}
                >
                  View Orders
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Generate Report Link */}
        <li className="nav-item">
          <Link
            to="/dashboard/sales/report"
            className="nav-link no-underline text-white bg-[#01aac1] hover:bg-[#00dbe7] focus:bg-[#00dbe7] flex items-center px-4 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <i className="bi bi-file-earmark-text me-3"></i> Generate Report
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;