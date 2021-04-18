var Food = require('../models/food.model')

exports.getFoods = async (query, page, limit) => {
    try {
        var foods = await Food
            .find(query)
            .skip(page*limit)
            .limit(limit)
            .exec();
        return foods;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Foods')
    }
}
// exports.getFoodsFiltered = async (query, page, limit) => {

//     try {
//         var foods = await Food
//             .find(query)
//             .skip(page*limit)
//             .limit(limit)
//             .exec();
//         return foods;
//     } catch (e) {
//         // Log Errors
//         throw Error('Error while Paginating Foods')
//     }
// }