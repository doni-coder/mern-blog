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
    throw new ApiError(400, "please provide blogImage");
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
    author: user._id,
  });

  console.log(createdBlog._id);

  await User.findByIdAndUpdate(
    user._id,
    {
        $set:{
            blogs:[createdBlog._id]
        }
    }
  )

  return res
    .status(200)
    .json(new ApiResponse(200, createdBlog, "blog created"));
});


export {
    createBlog
}