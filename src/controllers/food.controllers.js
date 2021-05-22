const mongoose = require("mongoose");

const FoodService = require('../services/food.services')

exports.getFoods = async function (req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const type = req.query.type ? req.query.type : 'all'
    try {
        if (type === 'all') {
            var foods = await FoodService.getFoods({}, page, limit)
        } if (type === 'basicFood') { // isVegetarian: true
            var foods = await FoodService.getFoods({ is_basic_food: true }, page, limit)
        } if (type === 'recipe') { // isVegetarian: false
            var foods = await FoodService.getFoods({ is_recipe: true }, page, limit)
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

exports.products_get_product = async function (req, res, next) {
    const id = req.params.foodId; //đây là id mongo
    try {
        var foods = await FoodService.getFoodById(id)
        return res.status(200).json({
            status: 200,
            message: "Successfully Food Details Retrieved",
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
};

exports.createFood = async function (req, res, next) {
    let value = {...req.body}
    try {
        let food = await FoodService.newFood(value)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Food",
            error: '',
            data: food,
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
exports.editFood = async (req, res, next) => {
    const _id = req.body.foodId;
    let value = {...req.body}
    delete value.foodId;
    try {
        await FoodService.editFoodByID(_id,value)
        return res.status(200).json({
            status: 200,
            message: "Successfully Edit Food",
            error: '',
            data: "",
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

  exports.deleteFood = async (req, res, next) => {
    const _id = req.body.foodId;
    try {   
        await FoodService.deleteFoodByID(_id)
        return res.status(200).json({
            status: 200,
            message: "Successfully Delete Food",
            error: '',
            data: "",
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

