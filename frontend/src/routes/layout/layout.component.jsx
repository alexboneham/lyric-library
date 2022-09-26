import { Fragment } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';

import './layout.styles.scss';

const Layout = () => {
  const activeStyle = { textDecoration: 'underline' };

  return (
    <div className="layout-container">
      <nav className="navigation">
        <div className="logo-container">
          <NavLink className="nav-link" to="/">
            <img src={logo} alt="lyric-library"/>
          </NavLink>
        </div>
        <div className="nav-links-container">
          <NavLink className="nav-link" to="/search" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Search
          </NavLink>
          <NavLink className="nav-link" to="/library" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Library
          </NavLink>
          <NavLink className="nav-link" to="/setlists" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Setlists
          </NavLink>
        </div>
      </nav>
      <div className="body-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
