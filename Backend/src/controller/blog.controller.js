import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrorHandle.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiHandleResponse.js";

const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "please provide title and description");
  }
  const blogImageLocal = req.file?.path;

  if (!blogImageLocal) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "please provide blogImage"));
  }

  const blogImage = await uploadToCloudinary(blogImageLocal);

  if (!blogImage) {
    throw new ApiError(500, "cannot upload image");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  const createdBlog = await Blog.create({
    title,
    description,
    blogImage: blogImage.url || "",
    views: 0,
    author: user._id,
  });

  console.log(createdBlog._id);

  await User.findByIdAndUpdate(user._id, {
    $set: {
      blogs: [...user.blogs, createdBlog],
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, createdBlog, "blog created"));
});

const editBlog = asyncHandler(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, description } = req.body;
  if (!id) {
    throw new ApiError(400, "blog not found");
  }
  const blogImageLocal = req.file?.path;
  const blogImage = await uploadToCloudinary(blogImageLocal);

  const oldBlogImage = await Blog.findById(id);

  const updatedBlogData = {
    title,
    description,
    blogImage: blogImage?.url || oldBlogImage.blogImage,
  };

  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      $set: updatedBlogData,
    },
    {
      new: true,
    }
  );

  if (!blog) {
    throw new ApiError(500, "unable to update blog");
  }

  user.blogs = user.blogs.map((blog) => {
    if (blog._id == id) {
      return { ...blog, ...updatedBlogData };
    }
    return blog;
  });

  await User.findByIdAndUpdate(user._id, {
    $set: {
      blogs: user.blogs,
    },
  });

  return res.status(200).json(new ApiResponse(200, blog, "blog updated"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(400, "user not authenticated");
  }

  console.log(id);

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new ApiError(500, "something went wrong");
  }
  const updatedBlogsArray = user.blogs.filter((blogId) => blogId._id != id);

  await User.findByIdAndUpdate(user._id, {
    $set: {
      blogs: updatedBlogsArray,
    },
  });

  return res.status(200).json(new ApiResponse(200, blog, "blog deleted"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError("not authenticated");
  }
  const allBlogs = await Blog.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, allBlogs, "fetched all blogs"));
});

const getBlogById = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError("not authenticated");
  }
  const { id } = req.params;

  const newBlog = await Blog.findByIdAndUpdate(
    id,
    {
      $inc: { views: 1 },
    },
    {
      new: true,
    }
  );

  if (!newBlog) {
    throw new ApiError(404, "blog not found");
  }

  user.blogs = user.blogs.map((blog) => {
    if (blog._id == id) {
      return { ...blog, views: newBlog.views };
    }
    return blog;
  });

  await User.findByIdAndUpdate(user._id, {
    $set: {
      blogs: user.blogs,
    },
  });

  return res.status(200).json(new ApiResponse(200, newBlog, "fetched blog"));
});

export { createBlog, editBlog, deleteBlog, getAllBlogs, getBlogById };
