import { Router } from "express";
import { userRegister,userLogin, userLogout,isLoggedIn,updateProfilePic } from "../controller/user.controllers.js";
import { upload } from "../middleware/multer.moddleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), userRegister);
router.route("/login").post(userLogin)
router.route("/status").get(isLoggedIn)

// protected route
router.route("/logout").post(verifyJwt,userLogout)
router.route("/updateProfilePic").put(verifyJwt,upload.single("profilePic"),updateProfilePic)

export default router;
