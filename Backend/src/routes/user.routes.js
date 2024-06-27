import { Router } from "express";
import { userRegister,userLogin } from "../controller/user.controllers.js";
import { upload } from "../middleware/multer.moddleware.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), userRegister);
router.route("/login").post(userLogin)

export default router;
