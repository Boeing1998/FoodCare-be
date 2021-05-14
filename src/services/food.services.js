var Food = require('../models/food.model')

exports.getFoods = async (query, page, limit) => {
    try {
        var foods = await Food
            .find(query, { _id: 0, food_name: 1, id: 1, images: 1, nutrions: 1 })
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
            .find({id:idParam})
            .exec()
        return foodDetails[0];

    } catch (e) {
        throw Error('Error while get food by ID')
    }
}
exports.getManyFoods = async  (idParam) => {
    try {
        let foods = await Promise.all(idParam.map( async item => {
            let food = await Food
            .findOne({id: item}, { _id: 0, food_name: 1, id: 1, images: 1, nutrions: 1 })
            return food
        })) 
        return foods
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Foods')
    }
}