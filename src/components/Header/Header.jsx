import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { UserContext } from "../../UserContext";

function Header() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loginTimestamp");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-base-200">
      <div className="container mx-auto">
        <div className="navbar">
          <div className="flex-1">
            <Link to="/" className="text-base-content font-bold text-3xl">
              Logo
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {user ? (
                <li>
                  <details>
                    <summary>Profile</summary>
                    <ul className="bg-base-100 rounded-t-none p-2 right-0">
                      <li className="px-4 py-2">Hello! {user.username}</li>
                      <li>
                        <Link to="/address" onClick={closeDropdown}>
                          Shipping & Billing Address{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile" onClick={closeDropdown}>
                          Account Details
                        </Link>
                      </li>
                      <li>
                        <Link to="/user-details" onClick={closeDropdown}>
                          User Details
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            closeDropdown();
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </details>
                </li>
              ) : (
                <li>
                  <details>
                    <summary>Profile</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li>
                        <Link to="/login" onClick={closeDropdown}>
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" onClick={closeDropdown}>
                          Register
                        </Link>
                      </li>
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
