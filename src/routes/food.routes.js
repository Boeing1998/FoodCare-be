const express = require("express");
const router = express.Router();

const FoodController = require('../controllers/food.controllers');
const checkAdmin = require('../helper/check-admin');
const checkAuth = require('../helper/check-auth');

router.get("/", FoodController.getFoods);

router.get("/:foodId", FoodController.products_get_product);

router.post("/create",checkAuth, FoodController.createFood);

router.patch("/edit", checkAuth, FoodController.editFood);

router.put("/delete", checkAuth, FoodController.deleteFood);

module.exports = router;
