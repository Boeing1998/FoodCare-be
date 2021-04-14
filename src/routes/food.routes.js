const express = require("express");
const router = express.Router();

const FoodController = require('../controllers/food.controllers');

router.get("/", FoodController.getFoods);

module.exports = router;
