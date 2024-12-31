import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check if the user is logged in by checking localStorage for a user ID or auth token
  const isLoggedIn = Boolean(localStorage.getItem('userId'));  // Example check
  const username = localStorage.getItem('userEmail') || 'User';

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleLogout = () => {
    // Remove user from localStorage to log out
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    // Redirect to login page
    navigate('/user/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* Website Name */}
        <Link to="/" className="navbar-brand">
          Blogging App
        </Link>

        {/* Create Blog Button */}
        <Link to="/blog/create" className="btn btn-success ms-auto">
          Create Blog
        </Link>

        {/* Search Bar */}
        <form className="d-flex ms-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            className="form-control me-2"
            placeholder="Search blogs..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-light"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>

        {/* Login Button (only visible if user is not logged in) */}
        {!isLoggedIn && (
          <Link to="/user/login" className="btn btn-light ms-3">
            Login
          </Link>
        )}

        {/* User/Profile Button with dropdown (only visible if user is logged in) */}
        {isLoggedIn && (
          <div className="ms-3">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              {username}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="dropdown-menu show">
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Log out
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
