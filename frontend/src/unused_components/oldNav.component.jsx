import { NavLink, Outlet } from "react-router-dom";

const oldNavbar = () => {
    const activeStyle = { textDecoration: 'underline' };
  
    return (
      <div className="layout-container">
        <nav className="navigation">
          <div className="logo-container">
            <NavLink className="nav-link" to="/">
              <img src={logo} alt="lyric-library" />
            </NavLink>
          </div>
          {/* <div className="nav-search-container">
            <SearchBar />
          </div> */}
          <div className="nav-links-container">
            <NavLink className="nav-link" to="/library" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Library
            </NavLink>
            <NavLink className="nav-link" to="/search" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Search
            </NavLink>
            <NavLink className="nav-link" to="/setlists" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              Setlists
            </NavLink>
          </div>
        </nav>
        <Outlet />
      </div>
    );
  };
  