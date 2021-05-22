const express = require("express");
const router = express.Router();

const MenuController = require('../controllers/menu.controllers');
const checkAuth = require('../helper/check-auth');

router.post("/create", checkAuth, MenuController.createMenu);

router.get("/detail", checkAuth, MenuController.showDetailMenu);

// router.put("/edit", checkAuth, MenuController.editMenu);

// router.patch("/addfood", checkAuth, MenuController.addFavFood);

// router.patch("/delfood", checkAuth, MenuController.delFavFood);

module.exports = router;
