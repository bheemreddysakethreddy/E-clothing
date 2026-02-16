import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../redux/authSlice";

const Login = () => {
  const [loginStatus, setLoginStatus] = useState(true);
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({ email: "", password: "", confirmPassword: "" });
  }, [loginStatus]);

  async function FetchUser(e) {
    e.preventDefault();
    if (loginStatus) {
      try {
        setErrorMessage("");

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email: details.email,
          password: details.password,
        });

        const { token, email, id, role } = res.data;

        localStorage.setItem("user", JSON.stringify({ id, email, role }));
        localStorage.setItem("token", token);

        dispatch(login());
        navigate("/");
      } catch (e) {
        setErrorMessage(e.response?.data?.message || "Login failed");
      }
    } else {
      try {
        setErrorMessage("");
        if (details.password !== details.confirmPassword) {
          setErrorMessage("passwords not matching");
          return;
        }
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/signin`, {
          email: details.email,
          password: details.password,
          confirmPassword: details.confirmPassword,
        });

        setErrorMessage(res.data.message);
      } catch (e) {
        setErrorMessage(e.response?.data?.message || "Signup failed");
      }
    }
  }

  function HandleFormDetails(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">
            {loginStatus ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {loginStatus
              ? "Login to continue shopping"
              : "Sign up to get started"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={FetchUser} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={HandleFormDetails}
              placeholder="you@example.com"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={HandleFormDetails}
              placeholder="••••••••"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
              required
            />
          </div>

          {!loginStatus && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={details.confirmPassword}
                onChange={HandleFormDetails}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                required
              />
            </div>
          )}

          {/* Error / Message */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {loginStatus ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch Auth */}
        <div className="text-center mt-6 text-sm">
          {loginStatus ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer font-medium"
                onClick={() => {
                  setLoginStatus(false);
                  setErrorMessage("");
                }}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer font-medium"
                onClick={() => {
                  setLoginStatus(true);
                  setErrorMessage("");
                }}
              >
                Login
              </span>
            </>
          )}
        </div>

        {/* Guest */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 text-sm text-gray-500 hover:underline"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Login;
