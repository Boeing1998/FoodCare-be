const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const Food = require("../models/food.model");
// var FoodService = require('../services/food.services')


exports.getFoods = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    const page = req.body.page ? req.body.page : 1;
    const limit = req.body.limit ? req.body.limit : 10;
    const i = {}
    Food
        .find()
        .select("_id food_name id image")
        .skip(page * limit)
        .limit(limit)
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,

                data : docs.map((doc) => {
                    const i = {
                        id: doc._id,
                        food: doc.food_name
                    }
                    console.log(i)
                    return i
                })
            };
            //   if (docs.length >= 0) {
            // console.log(docs)
            
            
            res.status(200).json(response);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
}