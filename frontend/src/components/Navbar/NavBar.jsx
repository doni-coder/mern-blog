import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "../ui/navbar-menu";
import { Link, useNavigate } from "react-router-dom";
import { useBlogContext } from "../../context/ContextProvider";
import Profile from "../ProfileBtn/Profile";
import axios from "axios";
axios.defaults.withCredentials = true;

function NavBar() {
  const [active, setActive] = useState(null);
  const { context, dispatch } = useBlogContext();
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:5001/api/v1/user/logout"
    );
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/")
    }
  };

  return (
    <div className="p-0">
      <Menu setActive={setActive}>
        <div className="w-full flex justify-between items-center sm:w-[90%] m-auto">
          <h2 className="text-white font-extrabold text-[18px] sm:text-[20px]">
            <Link to="/">Blog.com</Link>
          </h2>
          <div>
            {context.isLoggedIn ? (
              <div className="flex items-center gap-10">
                <HoveredLink to="/explore-blogs">Blogs</HoveredLink>

                <MenuItem
                  setActive={setActive}
                  active={active}
                  item={<Profile profilePic={context.profilePic} />}
                >
                  <div className="text-white justify-center flex flex-col">
                    <div>
                      <span>username : </span>
                      <span>{context.userDetails.username}</span>
                    </div>
                    <div>
                      <span>Email : </span>
                      <span>{context.userDetails.email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-[10px] py-[5px] me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      logout
                    </button>
                    <button
                      type="button"
                      className="mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-[10px] py-[5px] me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-green-600 dark:focus:ring-green-700"
                    >
                      <Link to={"/my-blogs"}>My Blogs</Link>
                    </button>
                  </div>
                </MenuItem>
              </div>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                >login</button>
              </Link>
            )}
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default NavBar;
