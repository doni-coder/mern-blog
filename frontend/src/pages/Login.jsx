import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="bg-slate-900 w-full h-screen flex justify-center overflow-hidden items-center">
      <motion.div
        variants={slideIn("left", "tween", 0.3, 0.2)}
        initial="hidden"
        whileInView="show"
      >
        <form className="max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
          <p className="text-white mt-5">Create new account &nbsp;<span><Link className="text-blue-800" to="/login">Signup</Link></span></p>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
