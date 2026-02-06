import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.cartData);

  function handleLogout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(logout());
      setOpen(false);
      navigate("/login");
    }
  }

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition text-[13px] ${
      isActive
        ? "text-black font-semibold after:w-full"
        : "text-gray-600 hover:text-black after:w-0"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black after:transition-all after:duration-300`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="vite.svg" alt="logo" className="h-8 w-8" />
          <h1 className="text-lg font-semibold">E-Clothing</h1>
        </div>

        {/* DESKTOP NAV (UNCHANGED) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink to="/trending" className={navLinkClass}>
            Trending
          </NavLink>
          <NavLink to="/men" className={navLinkClass}>
            Men
          </NavLink>
          <NavLink to="/women" className={navLinkClass}>
            Women
          </NavLink>
          <NavLink to="/kid" className={navLinkClass}>
            Kids
          </NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6">
          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold h-5 w-5 flex items-center justify-center rounded-full">
              {quantity.data.length}
            </span>
          </div>

          {/* LOGIN / LOGOUT (DESKTOP) */}
          <button
            onClick={() => (token ? handleLogout() : navigate("/login"))}
            className="hidden md:block bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            {token ? "Logout" : "Login"}
          </button>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-[260px] bg-white border-l z-50
  transform transition-transform duration-300 ease-in-out
  ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 h-20 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col px-4 py-4 space-y-4">
          <NavLink to="/trending" onClick={() => setOpen(false)}>
            Trending
          </NavLink>

          <NavLink to="/men" onClick={() => setOpen(false)}>
            Men
          </NavLink>

          <NavLink to="/women" onClick={() => setOpen(false)}>
            Women
          </NavLink>

          <NavLink to="/kid" onClick={() => setOpen(false)}>
            Kids
          </NavLink>

          <button
            onClick={() => {
              navigate("/cart");
              setOpen(false);
            }}
            className="text-left"
          >
            Cart ({quantity.data.length})
          </button>

          <button
            onClick={() => (token ? handleLogout() : navigate("/login"))}
            className="mt-4 bg-black text-white py-2 rounded-lg"
          >
            {token ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
