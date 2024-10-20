import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { UserContext } from '../../UserContext';

function Header() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);  

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('loginTimestamp');
    setUser(null); 
    navigate("/login");
  };

  return (
    <header className='bg-base-200'>
      <div className='container mx-auto'>
        <div className="navbar">
          <div className="flex-1">
            <Link to="/" className='text-base-content font-bold text-3xl'>Logo</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>

              {user ? (
                <li>
                  <details>
                    <summary>Profile</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><Link to="/profile">{user.username}</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </details>
                </li>
              ) : (
                <li>
                  <details>
                    <summary>Profile</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li><Link to="/login">Login</Link></li>
                      <li><Link to="/register">Register</Link></li>
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
