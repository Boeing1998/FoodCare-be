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
    username: { type: String, default: "" },
    avatarUrl: { type: String, default: "https://scontent-xsp1-1.xx.fbcdn.net/v/t1.18169-9/22852023_1453961094725074_7407215300491113493_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=ZulqROTK3y0AX87LhIf&_nc_ht=scontent-xsp1-1.xx&oh=df53872df116539e89fdd9ff088fa636&oe=60D9A168" },
    // gender: Boolean,
    // phoneNumber: Number,
    // dob: { type: String, default: "1990-01-01" },
    role: { type: String, default: "user" },
    // targetU: String,
    customFood: Object,
    fav: {
        type: Array,
        default: []
    },
    profile: {
        type: Object, default: {
            height: 0,
            weight: 0,
            targetU: 0,
            gender: 0,
            dob:  "1990-01-01",
            age: 0,
        }
    },
    diet: {
        type: Object, default: {
            gluten: "true",
            peanut: "true",
            eggs: "true",
            fish: "true",
            tree_nuts: "true",
            dairy: "true",
            soy: "true",
            shellfish: "true",
            red_meat: "true",
            vegetables: "true",
            poultry: "true",
            grains: "true",
            legumes: "true",
            mayo: "true",
            honey: "true",
            starchy_vegetables: "true",
            fats_nuts: "true",
            fruit: "true",
            diet: 0
        }
    },
    nutrition: {
        type: Object, default: {
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
        }
    },
    menu: {
        type: Array, default: [{
            name: "Breakfast",
            collId: null,
            fav: false
        },
        {
            name: "Lunch",
            collId: null,
            fav: false
        },
        {
            name: "Dinner",
            collId: null,
            fav: false
        }
        ]
    },
    isBanned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);