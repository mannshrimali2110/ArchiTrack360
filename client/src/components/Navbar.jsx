import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';
import Logo from '../assets/Logo2.png'; // Importing the logo image

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Redirect to login
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center h-16">
      <a className="text-xl font-bold flex items-center gap-4 no-underline" href="/dashboard" style={{ textDecoration: 'none' }}>
        <div className="bg-gray-700 p-2 rounded-md shadow-md">
          <img
            className="h-8 w-32"
            src={Logo}
            alt="Inventory Management"
          />
        </div>
      </a>
      <div className="flex items-center gap-4">
        <a
          className="hover:text-gray-300 text-white no-underline px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-300"
          href="/aboutus"
          style={{ textDecoration: 'none' }}
        >
          About Us
        </a>
        <button
          className="hover:text-gray-300 bg-red-500 px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
