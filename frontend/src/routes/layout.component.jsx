import { Outlet } from 'react-router-dom';

import NavBar from '../components/navbar.component';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
