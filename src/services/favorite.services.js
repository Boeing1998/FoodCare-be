const Favorite = require('../models/favorite.model')

exports.addFav = async (param) => {
    try {
        const fav = new Favorite(param)
        await fav.save()
        return fav
    } catch (e) {
        throw 'Error while Add Fav'
    }
}

exports.findFav = async (value) => {
    try {
        var favDetail = await Favorite
            .find(value)
            .exec()
        return favDetail;

    } catch (e) {
        throw Error('Error while get fav')
    }
}

exports.addQuantity = async (id, num) => {
    try {
        await Favorite.updateOne(id, { quantity: num })
            .exec()
    } catch (e) {
        // Log Errors
        throw Error('Error while Update Quantity')
    }
}
