import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useBlogContext } from "../context/ContextProvider";
import Loader from "../components/Loader/Loader";

function Login() {
  const { dispatch, context, message, setMessage } = useBlogContext();
  useEffect(()=>{
    setMessage("")
  },[])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await axios
      .post("https://mern-blog-backend-ny24.onrender.com/api/v1/user/login", formData)
      .then((response) => {
        const result = response.data;
        dispatch({ type: "SET_LOADING", payload: false });
        if (result) {
          dispatch({ type: "SET_STATUS", payload: true });
          navigate("/");
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return (
    <div className="bg-slate-900 w-full h-[91vh] flex justify-center overflow-hidden items-center">
      {context.isLoading ? <Loader /> : null}
      <motion.div
        variants={slideIn("left", "tween", 0.3, 0.2)}
        initial="hidden"
        whileInView="show"
        className="mt-[-30px]"
      >
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">
            Login
          </h2>
          <p className="text-center mb-2 text-red-600 ">{message}</p>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm  border   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="shadow-sm  border   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm-light"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
          <p className="text-white mt-5">
            Create new account &nbsp;
            <span>
              <Link className="text-blue-800" to="/signup">
                Signup
              </Link>
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
