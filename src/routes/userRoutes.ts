import { userController } from "../controllers/userControllers";
import express from "express";
import { upload } from "../helper/uploadImage";

const usercontroller = new userController();
const router = express.Router();


router.get("/register", usercontroller.userRegisterForm);
router.post("/register", upload.single("image"), usercontroller.userRegisterData);
router.get("/login", usercontroller.userLogInForm);
router.post("/login", usercontroller.userLogIn);
router.get("/email/verify/:token", usercontroller.emailVerification);


export default router;