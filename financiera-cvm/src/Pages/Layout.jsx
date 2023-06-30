import { Outlet, useLocation } from "react-router-dom";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
function Layout() {
  const location = useLocation();
  const isMenuRoute = location.pathname === "/inicio";

  return (
    <body style={{ backgroundColor: "#ffff" }}>
      {!isMenuRoute && <NavBar />}
      <Outlet />
      <Footer/>

    </body>
  );
}

export default Layout;
