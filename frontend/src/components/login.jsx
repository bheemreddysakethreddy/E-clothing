import { useEffect, useRef, useState } from "react";
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
  const [validOtp, setValidOtp] = useState(false);
  const [showOtpArea, setShowOtpArea] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const otpRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({ email: "", password: "", confirmPassword: "" });
  }, [loginStatus]);

  async function FetchUser(e) {
    e.preventDefault();
    if (loginStatus) {
      try {
        setErrorMessage("");

        const res = await axios.post("http://localhost:8000/login", {
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
        const res = await axios.post("http://localhost:8000/signin", {
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

  async function handleOtp() {
    setErrorMessage("");
    try {
      if (!details.email) {
        return setErrorMessage("email should not be empty");
      }
      setOtpSending(true);
      const res = await axios.post("http://localhost:8000/signin/otp", {
        email: details.email,
        password: details.password,
        confirmPassword: details.confirmPassword,
      });
      console.log(res);
      setErrorMessage(res.data.message);
      setShowOtpArea(true);

      setValidOtp();
    } catch (e) {
      console.log(e);
      setErrorMessage("user already exist");
    } finally {
      setOtpSending(false);
    }
  }

  async function verifyOtp() {
    const res = await axios.post("http://localhost:8000/signin/otp/verify", {
      email: details.email,
      otp: otp.reduce((acc, cur) => acc + cur, ""),
    });
    console.log(res);
    if (res.data.status) {
      setErrorMessage(res.data.message);
      setValidOtp(true);
      setShowOtpArea(false);
    }
  }

  function handleinputOtp(e, index) {
    if (isNaN(e.target.value)) return false;
    setOtp((prev) =>
      prev.map((ele, i) => (i === index ? e.target.value : ele)),
    );
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
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
            {!validOtp && (
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
            )}

            {!loginStatus && !validOtp && (
              <div className=" w-full flex justify-center items-center">
                <button
                  className="border mt-2 py-1 px-4 rounded-lg bg-green-500 text-xl"
                  type="button"
                  onClick={handleOtp}
                >
                  {otpSending
                    ? "sending..."
                    : showOtpArea
                      ? "otp sent"
                      : "send otp"}
                </button>
              </div>
            )}
          </div>

          {showOtpArea && (
            <div>
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={otpRef}
                  className="border w-10 h-10 pl-4 mr-6 rounded-lg"
                  maxLength={1}
                  onChange={(e) => handleinputOtp(e, index)}
                  onFocus={(e) => e.target.select}
                  autoFocus={index == 0}
                />
              ))}
              <div className=" w-full flex justify-center items-center">
                <button
                  className="border mt-2 py-1 px-4 rounded-lg bg-green-500 text-xl"
                  type="button"
                  onClick={verifyOtp}
                >
                  Verify Otp
                </button>
              </div>
            </div>
          )}

          {loginStatus && (
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
          )}

          {!loginStatus && validOtp && (
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
          )}

          {!loginStatus && validOtp && (
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
          {loginStatus && (
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {loginStatus ? "Login" : "Sign Up"}
            </button>
          )}
          {!loginStatus && validOtp && (
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {loginStatus ? "Login" : "Sign Up"}
            </button>
          )}
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
