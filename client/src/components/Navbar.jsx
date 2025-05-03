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
    <nav className="text-white p-4 flex justify-between items-center h-16" style={{ backgroundColor: '#00204a' }}>
      <a className="text-xl font-bold flex items-center gap-4 no-underline" href="/dashboard" style={{ textDecoration: 'none' }}>
        <div className="bg-gray-700 p-2 rounded-lg transition-colors duration-300" style={{ border: '2px solid #00ffff' }}>
          <img
            className="h-8 w-32"
            src={Logo}
            alt="Inventory Management"
          />
        </div>
      </a>
      <div className="flex items-center gap-6">
        <a
          className="text-white no-underline px-6 py-3 rounded-lg transition-colors duration-300"
          href="/aboutus"
          style={{ 
            textDecoration: 'none', 
            backgroundColor: '#00204a', 
            border: '2px solid #00ffff',
            ':hover': {
              backgroundColor: '#008b8b'
            }
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#008b8b'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00204a'}
        >
          About Us
        </a>
        <button
          className="text-white px-6 py-3 transition-colors duration-300"
          onClick={handleLogout}
          style={{ 
            backgroundColor: '#00204a', 
            border: '2px solid #00ffff',
            borderRadius: '0.5rem',
            ':hover': {
              backgroundColor: '#008b8b'
            }
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#008b8b'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00204a'}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;