import { Router } from "express";
import {
  createBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
} from "../controller/blog.controller.js";
import { upload } from "../middleware/multer.moddleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/create-blog")
  .post(verifyJwt, upload.single("blogImage"), createBlog);
router
  .route("/edit-blog/:id")
  .put(verifyJwt, upload.single("blogImage"), editBlog);
router.route("/delete-blog/:id").delete(verifyJwt, deleteBlog);
router.route("/get-blog/:id").get(verifyJwt, getBlogById);
router.route("/get-all-blogs").get(verifyJwt, getAllBlogs);

export default router;
