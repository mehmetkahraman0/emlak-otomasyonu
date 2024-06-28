import express from "express";
import { createUser,loginUser, updateCurrentUser, getCurrentUser, logoutCurrentUser, getAllUsers } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { sendmail } from "../deneme/mail.js";

const router = express.Router();


router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUsers);

router.route("/auth").post(loginUser);

router.route("/logout").post(logoutCurrentUser);

router.route("/profile").put(authenticate, updateCurrentUser).get(getCurrentUser);

router.route("/mail").post(sendmail)

export default router;

