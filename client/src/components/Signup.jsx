import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BG from '../assets/BG.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { email, password });
      if (response.data.success) {
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BG})`, backgroundColor: 'rgba(0, 0, 0, 0.3 )', backgroundBlendMode: 'overlay' }}
    >
      <div className="bg-gray-900/95 p-8 rounded-xl shadow-[0_0_30px_5px_rgba(255,255,255,0.2)] backdrop-blur-sm w-96 transform transition-all hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(255,255,255,0.25)]">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:border-blue-400 placeholder-gray-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              required
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:border-blue-400 placeholder-gray-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] font-semibold text-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/" className="text-blue-400 hover:text-blue-300 hover:underline font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
