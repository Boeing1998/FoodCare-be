const User = require('../models/user.model')

exports.getUserbyId = async (idParam) => {
    try {
        var userDatail = await User
            .find({ _id: idParam })
            .exec()
        return userDatail[0];
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

