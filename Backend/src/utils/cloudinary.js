import dotenv from "dotenv"
dotenv.config({path:"./.env"})
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFile) => {
  try {
    if (!localFile) {
      return null;
    }
    const result = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFile);
    return result;
  } catch (error) {
    console.log("cloudniry image upload error : ", error);
    fs.unlinkSync(localFile);
    console.log("config : ", cloudinary.config());
    return null;
  }
};

export { uploadToCloudinary };
