import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axiosinterceptors";

const Login = () => {
  const [loginDetails, setloginDetails] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      const res = await axiosInstance.post(`/admin/auth/login`, {
        email: loginDetails.email,
        password: loginDetails.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));

      navigate("/products");
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  function HandleDetails(e) {
    const { name, value } = e.target;
    setloginDetails((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <input
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Email"
          value={loginDetails.email}
          name="email"
          onChange={HandleDetails}
        />

        <input
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring"
          placeholder="Password"
          value={loginDetails.password}
          name="password"
          onChange={HandleDetails}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
