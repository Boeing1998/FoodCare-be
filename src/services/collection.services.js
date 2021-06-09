const jwt_decode = require("jwt-decode");

var CollecTion = require('../models/collection.model')
// var User = require('../models/user.model')

exports.getCollecTion = async (idParam) => {
    try {
        var coll = await CollecTion
            .find({ userId: idParam })
            .exec();
        return coll
    } catch (e) {
        // Log Errors
        throw Error('Error while get collection by userID')
    }
}

exports.newCollecTion = async (titleParam, desParam, imageParam, idParam) => {
    try {
        var doc = {
            title: titleParam,
            description: desParam,
            image: imageParam,
            userId: idParam
        }
        const coll = await new CollecTion(doc)
        await coll.save()
    } catch (e) {
        // Log Errors
        throw Error('Error while Adding Colection')
    }
}

exports.getDetailCollecTion = async (idParam, collParam) => {
    try {
        var coll = await CollecTion
            .findOne({
                userId: idParam,
                _id: collParam
            })
            .exec();
        return coll
    } catch (e) {
        // Log Errors
        throw Error('Error while get collection by userID')
    }
}

exports.addFoodIntoColl = async (idParam, collParam, foodParam) => {
    try {
        const coll = await CollecTion.updateOne({
            _id: collParam,
            userId: idParam,
        }, { $push: { foods: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Add Favorite')
    }
}

exports.delFoodFromColl = async (idParam, collParam, foodParam) => {
    try {
        const coll = await CollecTion.updateOne({
            _id: collParam,
            userId: idParam,
        }, { $pull: { foods: foodParam } })
    } catch (e) {
        // Log Errors
        throw Error('Error while Del Favorite')
    }
}

exports.deleteCollection = async (user, coll) => {
    try {
        const result = await CollecTion.deleteOne({ userId: user, _id: coll }).exec()
        if (result.deletedCount == 0) {
            throw ('Error while')
        }
    } catch (e) {
        throw Error('Error while Delete Collection')
    }
}

exports.editCollection2 = async (_id, uid, value) => {
    try {
        const result = await CollecTion.updateOne({ _id: _id, userId: uid }, { $set: value }).exec()
        if (result.nModified == 0) {
            throw ("Can't find food to edit")
        }
    } catch (e) {
        throw Error('Edit collection Failed')
    }
}