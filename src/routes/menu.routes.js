const express = require("express");
const router = express.Router();

const MenuController = require('../controllers/menu.controllers');
const checkAuth = require('../helper/check-auth');

router.get("/", checkAuth, MenuController.showAllMenuOfUser);

router.post("/create", checkAuth, MenuController.createMenu);

router.get("/detail/:menuId", checkAuth, MenuController.showDetailMenu);

// router.put("/edit", checkAuth, MenuController.editMenu);

router.patch("/breakfast/add", checkAuth, MenuController.addFoodBreakfast);
router.patch("/lunch/add", checkAuth, MenuController.addFoodLunch);
router.patch("/dinner/add", checkAuth, MenuController.addFoodDinner);

router.patch("/breakfast/del", checkAuth, MenuController.delFoodBreakfast);
router.patch("/lunch/del", checkAuth, MenuController.delFoodLunch);
router.patch("/dinner/del", checkAuth, MenuController.delFoodDinner);

// router.patch("/delfood", checkAuth, MenuController.delFavFood);

module.exports = router;
