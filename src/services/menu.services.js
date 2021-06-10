const Menu = require('../models/menu.model')
const FoodService = require('../services/food.services')

exports.newMenu = async (paramValue, date) => {
    try {
        const coll = await new Menu({ userId: paramValue, dayMenu: date })
        await coll.save()
        return coll._id
    } catch (e) {
        // Log Errors
        throw Error('Error while Create Menu')
    }
}

exports.showMenu = async (idMenu, idUser) => {
    try {
        const coll = await Menu
            .findOne({
                _id: idMenu,
                userId: idUser
            })
            .exec()
        return coll
    } catch (e) {
        // Log Errors
        throw Error('Error while Find and Show Menu')
    }
}

exports.getMenuByIdUser = async (idParam) => {
    try {
        const coll = await Menu
            .find({ userId: idParam })
            .exec()
        return coll
    } catch (e) {
        // Log Errors
        throw Error('Error while Find and Show Menu')
    }
}

exports.deleteMenuById = async (id) => {
    try {
        await Menu.remove({ _id: id })
            .exec()
    } catch (e) {
        // Log Errors
        throw Error('Error while Delete Menu')
    }
}


exports.getDetailByArMenu = async (trash) => {
    try {
        await Promise.all(trash.map(async (item) => {
            item.breakfast = await FoodService.getManyFoods(item.breakfast)
            item.lunch = await FoodService.getManyFoods(item.lunch)
            item.dinner = await FoodService.getManyFoods(item.dinner)
            return item
        }))
        return trash
    } catch (e) {
        // Log Errors
        throw Error('Error while Find and Show Menu')
    }
}

exports.add_food_morning = async (userParam, menuParam, foodParam) => {
    try {
        await Menu.updateOne({
            userId: userParam,
            _id: menuParam
        }, { $push: { breakfast: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Add Food to breakfast')
    }
}

exports.add_food_noon = async (userParam, menuParam, foodParam) => {
    try {
        await Menu.updateOne({
            userId: userParam,
            _id: menuParam
        }, { $push: { lunch: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Add Food to lunch')
    }
}

exports.add_food_night = async (userParam, menuParam, foodParam) => {
    try {
        await Menu.updateOne({
            userId: userParam,
            _id: menuParam
        }, { $push: { dinner: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Add Food to dinner')
    }
}

exports.del_food_morning = async (userParam, menuParam, foodParam) => {
    try {
        await Menu.updateOne({
            userId: userParam,
            _id: menuParam
        }, { $pull: { breakfast: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while delete Food from breakfast')
    }
}

exports.del_food_noon = async (userParam, menuParam, foodParam) => {
    try {
        await Menu.updateOne({
            userId: userParam,
            _id: menuParam
        }, { $pull: { lunch: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while delete Food from lunch')
    }
}

exports.del_food_night = async (userParam, menuParam, foodParam) => {
    try {
        await Menu.updateOne({
            userId: userParam,
            _id: menuParam
        }, { $pull: { dinner: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while delete Food from dinner')
    }
}