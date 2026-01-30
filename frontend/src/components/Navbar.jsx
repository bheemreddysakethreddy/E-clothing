import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.cartData);

  function HandleLogout() {
    let confir = confirm("are you sure to logout");
    if (confir) {
      dispatch(logout());
    }
  }

  return (
    <div className="h-20 flex justify-between items-center pl-10 pr-9 bg-amber-100 fixed z-50 left-0 right-0 top-0 ">
      <div className="flex gap-5 h-auto justify-center items-center">
        <img
          src="vite.svg"
          alt=""
          onClick={() => Navigate("/")}
          className="cursor-pointer"
        />
        <h3>E-clothing</h3>
      </div>
      <div className="flex gap-5 h-auto justify-center items-center">
        <Link to={"/trending"}>Trending</Link>
        <Link to={"/men"}>Men</Link>
        <Link to={"/women"}>Women</Link>
        <Link to={"/kid"}>Kids</Link>
        <div className="flex relative">
          <p
            className="absolute -top-1 left-4 font-semibold cursor-pointer text-white"
            onClick={() => Navigate("/cart")}
          >
            {quantity.data.length}
          </p>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-3xl cursor-pointer"
            onClick={() => Navigate("/cart")}
          />
        </div>
        <button
          onClick={() => HandleLogout()}
          className="bg-black text-amber-50 px-3 font-bold cursor-pointer py-1 rounded-2xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
