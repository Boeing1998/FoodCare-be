const mongoose = require("mongoose");
const jwt_decode = require("jwt-decode");

var CollectionService = require('../services/collection.services')
const FoodService = require('../services/food.services')

exports.createColection = async function (req, res, next) {
    let title = req.body.title
    let description = req.body.description
    let image = req.body.image
    let token = req.headers.authorization.split(" ")[1];
    let id = jwt_decode(token);
    try {
        let collections = await CollectionService.newCollecTion(title, description, image, id.userId)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Collection",
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
exports.showColection = async function (req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    let id = jwt_decode(token);
    try {
        let collections = await CollectionService.getCollecTion(id.userId)
        return res.status(200).json({
            status: 200,
            message: "Successfully Get Collection",
            error: '',
            data: collections.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    description: doc.description,
                    image: doc.image,
                    foods: doc.foods,
                    quantity: doc.foods.length
                }
            }),
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

exports.detailColection = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1];
    let id = jwt_decode(token);
    const coll = req.params.collectionID;

    try {
        let collections = await CollectionService.getDetailCollecTion(id.userId, coll)
        let arFood = collections.foods

        let food = await FoodService.getManyFoods(arFood)
        // console.log(food)
        return res.status(200).json({
            status: 200,
            message: "Successfully Get Details Collection",
            error: '',
            data: {
                _id: collections._id,
                title: collections.title,
                description: collections.description,
                image: collections.image,
                quantity: food.length,
                foods: food
            }
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

exports.addFood = async function (req, res, next) {

    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);
    const collId = req.body.collectionId
    const foodid = req.body.foodId; // đây là _id của mongo
    try {
        var foods = await CollectionService.addFoodIntoColl(id.userId, collId, foodid)
        return res.status(200).json({
            status: 200,
            message: "Successfully Add Food into this Collection",
            error: '',
            data: ""
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

exports.delFood = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt_decode(token);
    const collId = req.body.collectionId
    const foodid = req.body.foodId; // đây là _id của mongo
    try {
        var foods = await CollectionService.delFoodFromColl(id.userId, collId, foodid)
        return res.status(200).json({
            status: 200,
            message: "Successfully Remove Food into this Collection",
            error: '',
            data: ""
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

exports.dropColl = async (req, res, next) => {
    try {
        const coll = req.params.collectionID;
        const token = req.headers.authorization.split(" ")[1];
        const id = jwt_decode(token);

        await CollectionService.deleteCollection(id.userId, coll)
        return res.status(200).json({
            status: 200,
            message: "Delete Collection Success",
            error: '',
            data: '',

        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: "Delete Collection Failed",
            error: e.message,
            data: ''
        });
    }
}

exports.editCollection = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = jwt_decode(token);

        const _id = req.body.collId;
        let value = { ...req.body }
        delete value.collId;
        await CollectionService.editCollection2(_id, id.userId, value)
        return res.status(200).json({
            status: 200,
            message: "Successfully Edit Collection",
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
