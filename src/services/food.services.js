var Food = require('../models/food.model')

exports.getFoods = async (query, page, limit) => {
    try {
        var foods = await Food
            .find(query, {})
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
        let foods = await Promise.all(idParam.map(async item => {
            let food = await Food
                .findOne({ _id: item }, {})
            return food
        }))
        return foods
    } catch (e) {
        // Log Errors
        throw Error('Không tìm thấy food của user')
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

exports.editFoodByAdmin = async (id, value) => {
    const object = value
    object.updated_at = new Date();
    try {
        const result = await Food.updateOne({ _id: id }, { $set: object })
            .exec()
        if (result.nModified == 0) {
            throw ("Can't find food to edit")
        }
    } catch (e) {
        // Log Errors
        throw Error('Edit Food Failed')
    }
}

exports.editFoodByUser = async (id, uid, value) => {
    const object = value
    object.updated_at = new Date();
    try {
        const result = await Food.updateOne({
            _id: id,
            userId: uid
        }, { $set: object })
            .exec()
        if (result.nModified == 0) {
            throw ("Can't find food to edit")
        }

    } catch (e) {
        // Log Errors
        throw Error('Edit Food Failed')
    }
}

exports.deleteFoodByID = async (id) => {
    const del = new Date()
    try {
        await Food.updateOne({ _id: id }, { deleted_at: del })
            .exec()
    } catch (e) {
        // Log Errors
        throw Error('Error while Delete Food')
    }
}


exports.test = async (id, value) => {
    const object = value
    object.updated_at = new Date();
    try {
        const result = await Food.updateMany(id, { $set: object })
            .exec()
        if (result.nModified == 0) {
            throw ("Can't find food to edit")
        }
    } catch (e) {
        // Log Errors
        throw Error('Edit Food Failed')
    }
}