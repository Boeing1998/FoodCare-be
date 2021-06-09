const express = require("express");
const router = express.Router();

const FoodController = require('../controllers/food.controllers');
const checkAdmin = require('../helper/check-admin');
const checkAuth = require('../helper/check-auth');

router.get("/show", checkAuth,FoodController.getFoodUser) //getfood của user , custom = true va false, status = 'show', userID = token...
router.get("/admin/show",checkAdmin, FoodController.getFoodAdmin); // getfood của admin
router.get("/",FoodController.getFood) //getFood status = "show", deleted_at = null, custom = false

router.get("/:foodId", FoodController.products_get_product);

router.post("/request", checkAuth, FoodController.request);
router.get("/admin/request", checkAdmin, FoodController.viewRequest); //xem tất cả food request

router.post("/create", checkAuth, FoodController.createFoodByUser);
router.post("/admin/create", checkAdmin, FoodController.createFoodAdmin);


router.patch("/edit", checkAuth, FoodController.editFood);
router.patch("/admin/edit", checkAdmin, FoodController.editFoodAdmin);


router.patch("/delete/:foodId", checkAuth, FoodController.deleteFood);

router.get("/test", checkAuth, FoodController.test);

// router.post("/search", FoodController.searchFood);

module.exports = router;
