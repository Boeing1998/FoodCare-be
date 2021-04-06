// const User = require('../models/user.model')

// exports.getUsers = async (query, page, limit) => {
//     try {
//         var users = await User.find(query)
//         return users;
//     } catch (e) {
//         // Log Errors
//         throw Error('Error while Paginating Users')
//     }
// }
// exports.addUsers = async (query, page, limit) => {

//     try {
//         const user = new User({
//             _id: new mongoose.Types.ObjectId(),
//             name: req.body.name,
//         });
        
//         return user;
//     } catch (e) {
//         // Log Errors
//         throw Error('Không Tạo đc User')
//     }
// }

