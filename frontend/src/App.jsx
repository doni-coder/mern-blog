import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {navVariants} from "./utils/motion"
import Home from "./pages/Home";
import NavBar from "./components/Navbar/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ExploreBlogs from "./pages/ExploreBlogs";
import { Route, Routes } from "react-router-dom";
import ReadBlog from "./pages/ReadBlog";
import EditPage from "./pages/EditPage";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import { useBlogContext } from "./context/ContextProvider";
import axios from "axios";
axios.defaults.withCredentials = true;
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Error from "./components/ErrorAlert/Error";

function App() {
  const { context, getUserProfile, dispatch } = useBlogContext();
  const [flashScreen, setFlashScreen] = useState(true);
  const [isOnlile, setIsOnline] = useState(navigator.onLine);
  console.log(isOnlile);
  useEffect(() => {
    setTimeout(() => {
      setFlashScreen(false);
    }, 1000);
    if (context.isLoggedIn) {
      const asyncFunc = async () => {
        const response = await getUserProfile();
        console.log(response);
        dispatch({ type: "SET_PROFILE", payload: response.profilePic });
        dispatch({
          type: "SET_DETAILS",
          payload: { username: response.username, email: response.email },
        });
      };
      asyncFunc();
    }
  }, [context.isLoggedIn]);

  return (
    <div>
      {isOnlile ? (
        <>
          {flashScreen ? (
            <SplashScreen />
          ) : (
            <div>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/explore-blogs" element={<ExploreBlogs />} />
                <Route path="/read-blogs/:id" element={<ReadBlog />} />
                <Route path="/create-blogs" element={<CreateBlog />} />
                <Route path="/edit-blogs/:id" element={<EditPage />} />
                <Route path="/my-blogs" element={<MyBlogs />} />
              </Routes>
            </div>
          )}
        </>
      ) : (
        <motion.div variants={navVariants} initial="hidden" whileInView={"show"} className="flex justify-center mt-5">
          <Error/>
        </motion.div>
      )}
    </div>
  );
}

export default App;
