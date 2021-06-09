const User = require('../models/user.model')

exports.addFav = async (idParam, favParam) => {
    try {
        const user = await User.updateOne({ _id: idParam }, { $push: { fav: favParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Add Favorite')
    }
}

exports.delFav = async (idParam, favParam) => {
    try {
        const user = await User.updateOne({ _id: idParam }, { $pull: { fav: favParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Del Favorite')
    }
}

exports.getUserbyId = async (idParam) => {
    try {
        var userDetail = await User
            .findOne({ _id: idParam })
            .exec()
        return userDetail;
    } catch (e) {
        throw Error('Error while get user by ID')
    }
}

exports.checkExits = async (query, page, limit) => {
    try {
        var user = await User
            .find(query)
            .exec();
        return user;
    } catch (e) {
        // Log Errors
        throw Error('Email or Password is not exits')
    }
}

exports.editUser = async (id, value) => {
    try {
        const result = await User.updateOne({
            _id: id,
        }, { $set: value })
            .exec()
        if (result.nModified == 0) {
            throw ("Can't find user to edit")
        }

    } catch (e) {
        // Log Errors
        throw Error('Edit user Failed')
    }
}


