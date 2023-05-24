const express = require("express");
//const expressAsyncHandler = require("express-async-handler");
//const generateToken = require("../utils/generateToken.js");
const authToken = require("../../auth/authToken.js");
const userController = require("./userController");
const userRouter = express.Router();
const { body } = require("express-validator");
//get Roles

// /user

userRouter.get("/single/:slug", userController.info);
//userRouter.get("/getdetails", authToken(), userController.getDetails);

userRouter.get("/check", authToken(), userController.check);
userRouter.post("/signin", userController.signin);
userRouter.post("/signup", userController.signup);

userRouter.post("/addprofession", authToken(), userController.addProfession);

userRouter.patch("/profession", authToken(), userController.updateProfession);

userRouter.patch("/", authToken(), userController.editProfile);
userRouter.delete(
  "/profession/:id",
  authToken(),
  userController.deleteProfession
);
userRouter.post("/addeducation", authToken(), userController.addEducation);

userRouter.post("/addexperience", authToken(), userController.addExperience);

userRouter.post("/addaddress", authToken(), userController.addAddress);

module.exports = userRouter;
