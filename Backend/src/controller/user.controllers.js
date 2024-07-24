import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiErrorHandle.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiHandleResponse.js";

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === " ")) {
    throw new ApiError(400, "All fields are required");
  }

  const isUserExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExist) {
    return res.status(400).json(new ApiResponse(400,{message:"user already exist"},"user already exist"))
  }

  const userProfilePic_localPath = req.file?.path;
  console.log(userProfilePic_localPath);

  if (!userProfilePic_localPath) {
    throw new ApiError(400, "user Profile required");
  }

  const profilePic = await uploadToCloudinary(userProfilePic_localPath);

  if (!profilePic) {
    throw new ApiError(500, "failed to upload profile picture");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    profilePic: profilePic.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return res.status(500).json(new ApiResponse({message:"something wrong"},"failed"))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user created"));
});

const generateAccessAndRefreshToken = async (user_id) => {
  const user = await User.findById(user_id);
  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();
  return { refreshToken, accessToken };
};

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email && !password) {
    throw new ApiError(400, "please enter email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json(new ApiResponse(400,{message:"email not registered"},"email not registered"))
  }
  console.log(req.body.password);
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(400).json(new ApiResponse(400,{message:"incorrect password"},"password error"))
  }
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  if (!refreshToken && !accessToken) {
    throw new ApiError(500, "tokens cannot generated");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, loggedInUser, "login successful"));
});

const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, { logout: "success" }, "success"));
});

const isLoggedIn = asyncHandler(async (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res
      .status(200)
      .json(new ApiResponse(200, { isLogged: false }, "user not loggedin"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, { isLogged: true }, "user loggedin"));
  }
});

const updateProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  const ProfilePicLocalPath = req.file?.path;
  if (!ProfilePicLocalPath) {
    throw new ApiError(400, "please upload profile picture");
  }

  const newProfilePic = await uploadToCloudinary(ProfilePicLocalPath);

  if (!newProfilePic) {
    throw new ApiError(500, "unable to upload picture");
  }

  const updatedProfile = await User.findByIdAndUpdate(user._id, {
    $set: {
      profilePic: newProfilePic.url,
    },
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProfile, "profile pic updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.user?._id)

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  return res.status(200).json(new ApiResponse(200, req.user, "user found"));
});

export {
  userRegister,
  userLogin,
  userLogout,
  isLoggedIn,
  updateProfilePic,
  getCurrentUser,
};
