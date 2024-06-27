import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionDB = await mongoose.connect(`${process.env.MONGO_DB}/${DB_NAME}`)
    console.log(`mongodb connection success`);
  } catch (error) {
    console.log("error : mongodb connection error :: ", error);
  }
};

export {connectDB}