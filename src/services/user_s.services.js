// const User = require("../models/user.model");

// exports.addUser = async (email, pass) => {
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             return false
//             // res.status(500).json({
//             //     error: err
//             // });
//         } else {
//             const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//             return true
//         }
//     })
// };
// exports.isUnique = async (email) => {
//             User.find(email)
//                 .exec()
//                 .then(user => {
//                     if (user.length >= 1) {
//                         return false
//                         // res.status(409).json({
//                         //     message: "Mail exists"
//                         // });
//                     } else {
//                         return true;
//                     }
//                 });
//         }
