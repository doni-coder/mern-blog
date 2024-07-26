import React, { useEffect, useState } from "react";
import "./EditBlog.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogContext } from "../../context/ContextProvider";
axios.defaults.withCredentials = true;
import Loader from "../Loader/Loader";
import Alert from "../Alert/Alert";

function EditBlog({ btnType = "Save", editType = "create" }) {
  const { context, dispatch, message, setMessage } = useBlogContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    blogImage: "",
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
    const length = formData.description.length;
    if (length < 1000) {
      setMessage("description atleast contain 1000 character");
    } else {
      dispatch({ type: "SET_LOADING", payload: true });
      console.log(formData.blogImage);
      if (btnType !== "save") {
        const response = await axios
          .post("https://mern-blog-backend-ny24.onrender.com/api/v1/blog/create-blog", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            setMessage("Blog Created");
            dispatch({ type: "SET_LOADING", payload: false });
          })
          .catch((error) => {
            console.log(error);
            setMessage(error.response.data.message);
            dispatch({ type: "SET_LOADING", payload: false });
          });
      } else {
        const response = await axios
          .put(`https://mern-blog-backend-ny24.onrender.com/api/v1/blog/edit-blog/${id}`, formData)
          .then((response) => {
            dispatch({ type: "SET_LOADING", payload: false });
          })
          .catch((error) => {
            setMessage(error.response.data.message);
            dispatch({ type: "SET_LOADING", payload: false });
          });
      }
    }
  };

  const handleDelete = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await axios
      .delete(`https://mern-blog-backend-ny24.onrender.com/api/v1/blog/delete-blog/${id}`)
      .then((response) => {
        console.log(response);
        const blogId = response.data.data;
        dispatch({
          type: "DELETE_BLOG",
          payload: { blog: context.blogs, id: blogId._id },
        });
        setMessage("Blog deleted");
        dispatch({ type: "SET_LOADING", payload: false });
        navigate("/my-blogs");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    setMessage(null);
    if (id) {
      const getBlog = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await axios.get(
          `https://mern-blog-backend-ny24.onrender.com/api/v1/blog/get-blog/${id}`
        );
        const result = response.data.data;
        console.log(response);
        setFormData({
          title: result.title,
          description: result.description,
        });
        dispatch({ type: "SET_LOADING", payload: false });
      };
      getBlog();
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected or file type is not supported");
      return;
    }
    setFormData({ ...formData, blogImage: file });
  };

  return (
    <div className=" w-[90%] sm:w-fit flex justify-center py-4 px-4 bg-slate-950">
      {message ? <Alert message={message} /> : null}
      {context.isLoading ? <Loader /> : null}
      <form className="file-upload-form">
        <label htmlFor="file" className="file-upload-label">
          <div className="file-upload-design">
            <svg viewBox="0 0 640 512" height="1em">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
            </svg>
            <p>Drag and Drop image</p>
            <p>or</p>
            <span className="browse-button">Browse Image</span>
          </div>
          <input
            id="file"
            onChange={handleImageUpload}
            accept="image/*"
            type="file"
          />
        </label>
        <div className="mt-5 flex w-[80%] sm:w-auto flex-col gap-3">
          <label className="text-white text-[18px]" htmlFor="title">
            Title :{" "}
          </label>
          <input
            placeholder="Enter title"
            className="border-[2px] rounded-sm p-1 pl-3 outline-none"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            id="title"
          />

          <label className="text-white text-[18px]" htmlFor="description">
            Description :{" "}
          </label>
          <textarea
            placeholder="write blog ..."
            className="border-[2px] rounded-sm p-2  outline-green-600"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            id="description"
            rows={"5"}
            cols={"40"}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="focus:outline-none mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            onClick={handleSubmit}
          >
            {btnType}
          </button>
          {editType === "create" ? (
            ""
          ) : (
            <button
              type="button"
              className="focus:outline-none mt-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
