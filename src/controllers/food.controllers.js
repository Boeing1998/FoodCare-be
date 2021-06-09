const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

const FoodService = require('../services/food.services')
const UserService = require('../services/user.services')

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

exports.createFoodByUser = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    let value = { ...req.body }
    value.custom = true
    value.userId = id.userId
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
exports.createFoodAdmin = async function (req, res, next) {
    let value = { ...req.body }
    try {
        let food = await FoodService.newFood(value)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Food By Admin",
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
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const _id = req.body.foodId;
    let value = { ...req.body }
    delete value.foodId;
    try {
        await FoodService.editFoodByUser(_id, id.userId, value)
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

exports.editFoodAdmin = async (req, res, next) => {
    const _id = req.body.foodId;
    let value = { ...req.body }
    delete value.foodId;
    try {
        await FoodService.editFoodByAdmin(_id, value)
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

exports.request = async (req, res, next) => {
    const _id = req.body.foodId;
    const value = { request: true }
    try {
        await FoodService.editFoodByID(_id, value)
        return res.status(200).json({
            status: 200,
            message: "Successfully send a Request  Food",
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

exports.viewRequest = async function (req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    try {
        var foods = await FoodService.getFoods({ request: true }, page, limit)

        return res.status(200).json({
            status: 200,
            message: "Successfully Food's request Retrieved",
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

exports.deleteFood = async (req, res, next) => {
    const _id = req.params.foodId;
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

exports.getFoodAdmin = async function (req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const valueOld = req.query
    const value = {}
    for (const property in valueOld) {
        if (valueOld[property] == "true") {
            value[property] = valueOld[property]
        }
        if (property == "text") {
            if (valueOld["text"]) {
                value["$text"] = { $search: valueOld[property] }
            }
        }
    }

    value.deleted_at = null

    const type = req.query.type ? req.query.type : 'all'
    if (type === 'basicFood') { // isVegetarian: true
        value.is_basic_food = true
    }
    if (type === 'recipe') { // isVegetarian: false
        value.is_recipe = true
    }
    try {
        var foods = await FoodService.getFoods(value, page, limit)
        return res.status(200).json({
            status: 200,
            message: "Successfully Food Retrieved (admin)",
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

exports.getFood = async function (req, res, next) {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const valueOld = req.query
    const value = {}
    for (const property in valueOld) {
        if (valueOld[property] == "true") {
            value[property] = valueOld[property]
        }
        if (property == "text") {
            if (valueOld["text"]) {
                value["$text"] = { $search: valueOld[property] }
            }
        }
    }
    value.custom = "false"
    value.status = "show"
    value.deleted_at = null

    const type = req.query.type ? req.query.type : 'all'
    if (type === 'basicFood') { // isVegetarian: true
        value.is_basic_food = true
    }
    if (type === 'recipe') { // isVegetarian: false
        value.is_recipe = true
    }

    try {
        console.log(value)
        var foods = await FoodService.getFoods(value, page, limit)
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

exports.getFoodUser = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const valueOld = req.query
    const value = {}
    for (const property in valueOld) {
        if (valueOld[property] == "true") {
            value[property] = valueOld[property]
        }
        if (property == "text") {
            if (valueOld["text"]) {
                value["$text"] = { $search: valueOld[property] }
            }
        }
    }
    value.custom = "true"
    value.status = "show"
    value.deleted_at = null
    value.userId = id.userId

    const type = req.query.type ? req.query.type : 'all'
    if (type === 'basicFood') { // isVegetarian: true
        value.is_basic_food = true
    }
    if (type === 'recipe') { // isVegetarian: false
        value.is_recipe = true
    }

    try {
        console.log(value)
        var foods = await FoodService.getFoods(value, page, limit)
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

exports.recommendFood = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);

    const userDetail = await UserService.getUserbyId(id.userId)
    const diet = userDetail.diet
    delete diet.diet

    const valueOld = diet
    const value = {}
    for (const property in valueOld) {
        if (valueOld[property] == "false") {
            value[property] = valueOld[property]
        }
    }
    value.custom = "false"
    value.status = "show"
    value.deleted_at = null
    value.is_recipe = true
    // console.log(value)
    try {
        var foods = await FoodService.getFoods(value, 0, 50)
        return res.status(200).json({
            status: 200,
            message: "Successfully Food Recommend Retrieved",
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







// exports.searchFood = async function (req, res, next) {
//     let keyword = req.body.keyword
//     let value = { $text: { $search: keyword } }
//     try {
//         var foods = await FoodService.getFoods(value, 0, 3)
//         return res.status(200).json({
//             status: 200,
//             message: "This is the name of Food like " + keyword,
//             error: '',
//             data: foods,
//         });
//     } catch (e) {
//         return res.status(400).json({
//             status: 400,
//             message: "",
//             error: e.message,
//             data: ''
//         });
//     }
// }

exports.dmVinh = async (req, res, next) => {
    // const _id = req.body.foodId;
    let value = { fruit: "true" }
    // delete value.foodId;

    let ar = []

    try {
        await FoodService.test({ $or: ar }, value)
        return res.status(200).json({
            status: 200,
            message: "Successfully Edit thanhf cong Food",
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