const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        require: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, require: true},
    sex: Boolean,
    phoneNumber: Number,
    dob: String,
    hooby: Object,
    purpose: Object,
});

// userSchema.static = {
//     //Duyệt tất cả user
//     findAllUser() {
//         return this.find()
//     },
//     //Tạo mới user
//     createUser(user) {
//         return this.create(user)
//     },
//     //Tìm user bằng name
//     findUserbyName(name) {
//         return this.find(name).exec()
//     }
// }


module.exports = mongoose.model('User', userSchema);