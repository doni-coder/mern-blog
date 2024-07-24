import React, { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import reducer from "../Reducer/BlogReducer";
import axios from "axios";
axios.defaults.withCredentials = true;

const blogContext = createContext({});

const ContextProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: true,
    profilePic: "",
    blogs: [],
    isLoading: false,
    userDetails: {
      username: "",
      email: "",
    },
    exploreBlogs: [],
    singleBlog: {},
  };

  const [message, setMessage] = useState("");

  const getUserProfile = async () => {
    const response = await axios.get(
      "http://localhost:5001/api/v1/user/userProfile"
    );
    console.log(response);
    return response.data.data;
  };

  const [context, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getStatus = async () => {
      const response = await axios.get(
        "http://localhost:5001/api/v1/user/status"
      );
      console.log(response);
      const result = response.data.data;
      const status = result.isLogged;
      if (status) {
        dispatch({ type: "SET_STATUS", payload: status });
      } else {
        dispatch({ type: "SET_STATUS", payload: status });
      }
    };
    getStatus();
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(
        "http://localhost:5001/api/v1/blog/get-all-blogs"
      );
      console.log(response);
      const result = response.data.data;
      dispatch({ type: "SET_EXPLORE_BLOGS", payload: result });
    };
    getBlogs();
  }, []);

  return (
    <blogContext.Provider
      value={{ context, dispatch, message, setMessage, getUserProfile }}
    >
      {children}
    </blogContext.Provider>
  );
};

export const useBlogContext = () => {
  return useContext(blogContext);
};

export default ContextProvider;
