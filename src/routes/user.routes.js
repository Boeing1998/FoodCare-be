const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controllers');
const checkAuth = require('../helper/check-auth');

const RegisterValidation = require('../validations/register.validation');
const ChangePassValidation = require('../validations/user.validation');

router.post("/signup", RegisterValidation, UserController.user_signup);


router.post("/login", UserController.user_login);

router.delete("/logout", checkAuth, UserController.logout)

// router.get("/:userId", checkAuth, UserController)

router.get("/profile", checkAuth, UserController.showDetail);

router.put("/edit", checkAuth, UserController.editUser);

router.put("/password", checkAuth, ChangePassValidation, UserController.changePassword);


module.exports = router;
