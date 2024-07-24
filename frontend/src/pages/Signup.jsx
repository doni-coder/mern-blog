import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBlogContext } from "../context/ContextProvider";
axios.defaults.withCredentials = true;
import Loader from "../components/Loader/Loader";

function Signup() {
  const { context, dispatch, message, setMessage } = useBlogContext();
  const navigate = useNavigate();

  useEffect(()=>{
    setMessage("")
  },[])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
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
      .post("http://localhost:5001/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({ type: "SET_LOADING", payload: false });
        navigate("/login");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected or file type is not supported");
      return;
    }
    setFormData({ ...formData, profilePic: file });
    console.log(formData.profilePic);
  };

  return (
    <div className="bg-slate-900 w-full h-screen flex justify-center overflow-hidden items-center">
      {context.isLoading ? <Loader /> : null}
      <motion.div
        variants={slideIn("left", "tween", 0.3, 0.2)}
        initial="hidden"
        whileInView="show"
      >
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">
            Register
          </h2>
          <p className="text-center mb-2 text-red-600 ">{message}</p>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="profilePic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              upload ProfilePic
            </label>
            <input
              type="file"
              id="profilepic"
              name="profilePic"
              accept="image/*"
              onChange={handleImageUpload}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="profile pic"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="name@flowbite.com"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Register new account
          </button>
          <p className="text-white mt-5">
            If already have account then{" "}
            <span>
              <Link className="text-blue-800" to="/login">
                Login
              </Link>
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
