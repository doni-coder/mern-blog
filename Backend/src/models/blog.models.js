import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    blogImage:{
        type:String,
        required:true
    },
    views:{
        type:Number
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

const Blog = mongoose.model("blog",blogSchema)

export {Blog}