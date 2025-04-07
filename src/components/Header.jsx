
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>

          {!token && (
            <>
              {isLoginPage && <li><Link to="/register">Register</Link></li>}
              {isRegisterPage && <li><Link to="/login">Login</Link></li>}
              {!isLoginPage && !isRegisterPage && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </>
          )}

          {token && (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
