import { Router } from "express";
import {createBlog} from "../controller/blog.controller.js"
import { upload } from "../middleware/multer.moddleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/create-blog").post(verifyJwt,upload.single("blogImage"),createBlog)

export default router
