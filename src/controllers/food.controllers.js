const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const Food = require("../models/food.model");
const FoodService = require('../services/food.services')


exports.getFoods = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const type = req.query.type ? req.query.type : 'all'
    try {
        if (type === 'all') {
            var foods = await FoodService.getFoods({}, page, limit)
        } if (type === 'basicFood') { // isVegetarian: true
            var foods = await FoodService.getFoods({ isVegetarian: true }, page, limit)
        } if (type === 'recipe') { // isVegetarian: false
            var foods = await FoodService.getFoods({ isVegetarian: false }, page, limit)
        }
        return res.status(200).json({
            status: 200,
            message: "Successfully Food Retrieved",
            error: '',
            data: foods

        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: "",
            error: e.message,
            data: ''
        });
    }

}