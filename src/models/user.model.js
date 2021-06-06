const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        require: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, require: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    avatarUrl: { type: String, default: "https://scontent-xsp1-1.xx.fbcdn.net/v/t1.18169-9/22852023_1453961094725074_7407215300491113493_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ZulqROTK3y0AX87LhIf&_nc_ht=scontent-xsp1-1.xx&oh=df53872df116539e89fdd9ff088fa636&oe=60D9A168" },
    gender: Boolean,
    phoneNumber: Number,
    dob: { type: String, default: "1990-01-01" },
    role: { type: String, default: "user" },
    targetU: String,
    customFood: Object,
    fav: {
        type: Array,
        default: []
    },
    menu: Object,
    isBanned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);