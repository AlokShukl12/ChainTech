import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setExpanded(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeMenu();
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active fw-semibold' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/" onClick={closeMenu}>
          Account Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${expanded ? ' show' : ''}`} id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className={navLinkClass} onClick={closeMenu}>
                Register
              </NavLink>
            </li>
            {currentUser && (
              <li className="nav-item">
                <NavLink to="/account" className={navLinkClass} onClick={closeMenu}>
                  Account
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {currentUser ? (
              <>
                <li className="nav-item me-lg-3">
                  <span className="navbar-text small text-light">
                    Signed in as <span className="fw-semibold">{currentUser.name}</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="btn btn-sm btn-light fw-semibold"
                  onClick={closeMenu}
                >
                  Get Started
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
