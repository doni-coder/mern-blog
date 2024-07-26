import React, { useEffect } from "react";
import Tr from "../components/TableRow/Tr";
import axios from "axios";
import { useBlogContext } from "../context/ContextProvider";
axios.defaults.withCredentials = true;
import { Button } from "../components/ui/moving-border";
import { Link } from "react-router-dom";

function MyBlogs() {
  
  const { context, getUserProfile, dispatch } = useBlogContext();
  useEffect(() => {
    const asyncFunc = async () => {
      const response = await getUserProfile();
      dispatch({
        type: "SET_BLOGS",
        payload: response.blogs,
      });
      console.log("response:", response);
    };
    asyncFunc();
  }, []);

  return (
    <div className="bg-slate-950">
      <div className="w-full relative">
        <div className="w-fit ml-[83%] mb-0">
          <Button
            borderRadius="1.75rem"
            className=" bg-slate-900 text-white border-slate-800"
          >
            <span className="text-[20px]">
              <Link to="/create-blogs">+</Link>
            </span>
          </Button>
        </div>
      </div>
      <div className="w-full relative flex min-h-[90vh] bg-slate-950">
        <div className="relative m-auto mt-6 sm:w-[50%] w-[90%] overflow-x-auto rounded-lg shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image preview
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {context.blogs.map((blog) => {
                return (
                  <Tr
                    key={blog._id}
                    img={blog.blogImage}
                    title={blog.title}
                    blogId={blog._id}
                    views={blog.views}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
