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
    firstName: String,
    lastName: String,
    gender: Boolean,
    phoneNumber: Number,
    dob: String,
    targetU: String,
    customFood: Object,
    collecTion: Object,
    fav: Object,
    menu: Object,
    isBanned:  {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);