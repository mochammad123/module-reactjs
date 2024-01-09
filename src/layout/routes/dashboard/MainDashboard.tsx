import Header from "../../main/headers/Header";
import Sidebar from "../../main/sidebars/Sidebar";
import { Navigate, Outlet } from "react-router-dom";

const MainDashboard = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
      {/* <Footers /> */}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default MainDashboard;
