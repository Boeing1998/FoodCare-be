const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user.controllers');
const checkAuth = require('../helper/check-auth');
const checkAdmin = require('../helper/check-admin'); // check xem có phải admin không ?

const RegisterValidation = require('../validations/register.validation');
const ChangePassValidation = require('../validations/user.validation');

router.post("/signup", RegisterValidation, UserController.user_signup);


router.post("/login", UserController.user_login);

router.delete("/logout", checkAuth, UserController.logout)

router.get("/profile", checkAuth, UserController.showDetail);

router.put("/edit", checkAuth, UserController.editUser);

router.put("/password", checkAuth, ChangePassValidation, UserController.changePassword);

router.patch("/addfood", checkAuth, UserController.addFavFood);

router.patch("/delfood", checkAuth, UserController.delFavFood);

router.get("/active/:id", UserController.activeUser);
router.get("/resetpassword/:id", UserController.resetPass);


module.exports = router;
