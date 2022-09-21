import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import './layout.styles.scss';

const Layout = () => {
  return (
    <Fragment>
      <nav className="navigation">
        <div className="logo-container">
          <Link className="nav-link" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="nav-links-container">
          <Link className="nav-link" to="/library">
            Library
          </Link>
          <Link className="nav-link" to="/search">
            Search
          </Link>
          <Link className="nav-link" to="/setlists">
            Setlists
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Layout;
