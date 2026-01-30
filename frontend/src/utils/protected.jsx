import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
const Protected = () => {
  let user = useSelector((state) => state.isLoggedIn.isLoggedIn);
  return user ? (
    <>
      <Navbar /> <Outlet />
      {/* <Footer /> */}
    </>
  ) : (
    <Navigate to="/login" />
  );
};
export default Protected;
