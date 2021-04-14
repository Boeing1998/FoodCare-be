const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const Food = require("../models/food.model");
var FoodService = require('../services/food.services')


exports.getFoods = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.body.page ? req.body.page : 0;
    const limit = req.body.limit ? req.body.limit : 10;

    try {
        var foods = await FoodService.getFoods({}, page, limit)
        console.log(foods)
        return res.status(200).json({
            status: 200,
            message: "Succesfully Foods Retrieved",
            error: '',
            data: foods

        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}