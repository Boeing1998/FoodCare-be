const express = require("express");
const router = express.Router();

const FoodController = require('../controllers/food.controllers');

router.get("/", FoodController.getFoods);
router.get("/:foodId", FoodController.products_get_product);

module.exports = router;
