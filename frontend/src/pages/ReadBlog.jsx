import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useBlogContext } from "../context/ContextProvider";
axios.defaults.withCredentials = true;

function ReadBlog({ title, description, blogImage }) {
  const { id } = useParams();
  const { context, dispatch } = useBlogContext();

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const getSingleBlog = async () => {
      const response = await axios.get(
        `http://localhost:5001/api/v1/blog/get-blog/${id}`
      );
      const result = response.data.data;
      dispatch({ type: "SET_SINGLE_BLOG", payload: result });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    getSingleBlog();
  }, [id]);

  return (
    <div className="w-full flex justify-center min-h-screen bg-slate-950 pt-7">
      <div className="w-[90%]  md:w-[50%]">
        <div className="">
          <img
            className="rounded-md w-full object-contain"
            src={context.singleBlog.blogImage}
            alt=""
          />
        </div>
        <h2 className="text-white text-3xl font-bold mt-3">
          {context.singleBlog.title} :
        </h2>
        <p className="text-white  mt-3">{context.singleBlog.description}</p>
      </div>
    </div>
  );
}

export default ReadBlog;
