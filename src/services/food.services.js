var Food = require('../models/food.model')

exports.getFoods = async (query, page, limit) => {
    try {
        var foods = await Food
            .find(query, { _id: 1, food_name: 1, id: 1, images: 1, nutrions: 1 })
            .skip(page * limit)
            .limit(limit)
            .exec();
        return foods;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Foods')
    }
}

exports.getFoodById = async (idParam) => {
    try {
        var foodDetails = await Food
            .find({ _id: idParam })
            .exec()
        return foodDetails[0];

    } catch (e) {
        throw Error('Error while get food by ID')
    }
}

exports.getManyFoods = async (idParam) => {
    try {
        console.log("test" +idParam)
        let foods = await Promise.all(idParam.map(async item => {
            let food = await Food
                .findOne({ _id: item }, { _id: 1, food_name: 1, id: 1, images: 1, nutrions: 1 })
            return food
        }))
        return foods
    } catch (e) {
        // Log Errors
        throw Error('Không tìm thấy food trong phần favorite của user')
    }
}

exports.newFood = async (paramValue) => {
    try {
        const coll = await new Food(paramValue)
        await coll.save()
        return coll._id
    } catch (e) {
        // Log Errors
        throw Error('Error while Adding Food')
    }
}

exports.editFoodByID = async (id,value) => {
    try {
        await Food.updateOne({ _id: id }, { $set: value })
        .exec()
    } catch (e) {
        // Log Errors
        throw Error('Error while Edit Food')
    }
}

exports.deleteFoodByID = async (id) => {
    try {
        await Food.remove({ _id: id })
        .exec()
    } catch (e) {
        // Log Errors
        throw Error('Error while Delete Food')
    }
}