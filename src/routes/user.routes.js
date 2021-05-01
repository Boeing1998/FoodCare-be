const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controllers');
const checkAuth = require('../helper/check-auth');

router.post("/signup", UserValidation.register, UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/logout", checkAuth, UserController.logout )

router.delete("/:userId", checkAuth, UserController.user_delete);

router.put("/asd");

module.exports = router;
