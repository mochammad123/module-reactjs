import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PrivateRoutes;
