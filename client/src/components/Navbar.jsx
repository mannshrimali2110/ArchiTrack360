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
      <div className="flex items-center gap-6">
        <a
          className="text-white no-underline px-6 py-3 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
          href="/aboutus"
          style={{ textDecoration: 'none' }}
        >
          About Us
        </a>
        <button
          className="text-white px-6 py-3 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
