const Menu = require('../models/menu.model')

exports.newMenu = async (paramValue) => {
    try {
        const coll = await new Menu({ idUser: paramValue })
        await coll.save()
        return coll._id
    } catch (e) {
        // Log Errors
        throw Error('Error while Create Menu')
    }
}

exports.showMenu = async (idParam) => {
    try {
        const coll = await Menu
            .findOne({ _id: idParam })
            .exec()
        return coll
    } catch (e) {
        // Log Errors
        throw Error('Error while Find and Show Menu')
    }
}