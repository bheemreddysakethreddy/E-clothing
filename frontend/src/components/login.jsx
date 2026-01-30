import { useState } from "react";
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
  const Navigate = useNavigate();
  let dispatch = useDispatch();

  async function FetchUser(e) {
    e.preventDefault();
    /** 
    if(!email.endsWith("@gmail.com")){
        setErrorMessage("email not valid")
      }
      if(password.length<8){
          setErrorMessage("Password too short")
        }
    */

    if (loginStatus) {
      try {
        setErrorMessage("");
        let res = await axios.post(
          "http://localhost:8000/login",
          {
            email: details.email,
            password: details.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log(res.data.token);
        console.log(res.data.user);
        dispatch(login());
        Navigate("/");
      } catch (e) {
        setErrorMessage(e.response.data.message);
        console.log(e.response.data.message);
      }
    } else {
      try {
        setErrorMessage("");
        let res = await axios.post(
          "http://localhost:8000/signin",
          {
            email: details.email,
            password: details.password,
            confirmPassword: details.confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log(res.data.message);
        setErrorMessage(res.data.message);
      } catch (e) {
        setErrorMessage(e.response.data.message);
        console.log(e.response.data.message);
      }
    }
  }

  function HandleFormDetails(e) {
    let { name, value } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(details);
  }

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-neutral-900 text-amber-50">
        <form
          onSubmit={FetchUser}
          className="w-[300px] p-2 md:w-[400px] h-130 flex flex-col justify-center items-center border rounded-2xl md:p-10 bg-neutral-800"
        >
          <label htmlFor="email" className="w-[80%]">
            {" "}
            email: <br />
            <input
              type="text"
              id="email"
              name="email"
              value={details.email}
              onChange={HandleFormDetails}
              placeholder="enter Email"
              className="border w-full py-2 px-2 rounded outline-none border-amber-50  "
            />
          </label>
          <br />
          <label htmlFor="password" className="w-[80%]">
            {" "}
            Password: <br />
            <input
              type="text"
              id="password"
              name="password"
              placeholder="enter Password"
              onChange={HandleFormDetails}
              className="border w-full py-2 px-2 rounded outline-none border-amber-50  "
            />
          </label>
          <br />

          {!loginStatus && (
            <label htmlFor="confirmPassword" className="w-[80%]">
              confirm Password: <br />
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                onChange={HandleFormDetails}
                placeholder="re-enter Password"
                className="border w-full py-2 px-2 rounded outline-none border-amber-50  "
              />
            </label>
          )}
          {errorMessage && <p>{errorMessage}</p>}
          <div className="flex gap-5">
            <button
              type="submit"
              className="h-10 w-20 bg-gray-700 rounded cursor-pointer mt-10 hover:scale-95 hover:bg-gray-800"
            >
              {loginStatus ? "Login" : "Sign in"}
            </button>
          </div>
          <br />
          {loginStatus && (
            <p>
              Don't have an account ?{" "}
              <span
                className="cursor-pointer text-blue-500"
                onClick={() => (setLoginStatus(false), setErrorMessage(""))}
              >
                Sign up
              </span>
            </p>
          )}
          {!loginStatus && (
            <p>
              Already have an account ?{" "}
              <span
                className="cursor-pointer text-blue-500"
                onClick={
                  () => (setLoginStatus(true), setErrorMessage(""))
                  // setDetails({ email: "", password: "", confirmPassword: "" })
                }
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
