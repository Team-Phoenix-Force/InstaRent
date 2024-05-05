import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import google from "../assets/Google.png";

const Login = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");

  const [values, setValues] = React.useState({
    userid: "",
    password: "",
  });

  const toastOptions = {
    position: "top-center",
    duration: 1000,
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userid, password } = values;
    axios.defaults.withCredentials = true;

    if (handleValidation()) {
      const { data } = await axios.post(
        "http://localhost:3000/users/login",
        {
          userid,
          password,
        },
        {
          withCredentials: true,
        },
      );

      if (data.status === true) {
        localStorage.setItem("loginstatus", "true");
        localStorage.setItem("userid", data.userid);
        localStorage.setItem("city", data.city);
        localStorage.setItem("name", data.name);

        toast.success(data.message, toastOptions);
        setAuth(true);
        setName(data.name);
        setUserid(data.userid);
        console.log(data.userid);
        setTimeout(() => navigate("/"), 1000);
      }
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { userid, password } = values;

    if (userid === "" || password === "") {
      toast.error("Please fill out all fields!", toastOptions);
      return false;
    }
    if (userid.length < 3) {
      toast.error("Userid must be at least 3 characters long!", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <div className="bg-[#f9fafb] flex gap-8 flex-col justify-center items-center min-h-screen min-w-screen">
      <div className="text-3xl font-semibold">Welcome to InstaRent</div>
      <div className="p-8 bg-slate-100 shadow-md rounded-md flex flex-col items-center">
        <form
          method="post"
          className="w-96 flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="userid" className="font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="userid"
            id="userid"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="px-2 w-full border-2 rounded-md outline-2 py-1.5 focus:outline-indigo-600"
            onChange={(e) => handleChange(e)}
          />

          <button
            type="submit"
            className="w-full mt-4 bg-custom_primary text-white font-medium text-lg  rounded-md outline-2 py-1.5 hover:bg-indigo-500"
          >
            Login
          </button>

          <div className="flex gap-2 justify-between">
            <div className="text-custom_primary font-semibold cursor-pointer">
              Forgot Password?
            </div>
            <div>
              <span className=" text-gray-700 mr-2">Did not sign up?</span>
              <a
                href="/register"
                className=" text-custom_primary font-semibold cursor-pointer"
              >
                Register
              </a>
            </div>
          </div>

        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export { Login };
