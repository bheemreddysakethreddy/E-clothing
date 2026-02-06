import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" />;
  if (user?.role !== "admin") return <Navigate to="/login" />;

  return <Outlet />;
};

export default AdminProtected;
