const { Schema, model } = require('mongoose');

const MenuSchema = new Schema({
    userId: String,
    breakfast: {
        type: Array,
        default: []
    },
    lunch: {
        type: Array,
        default: []
    },
    dinner: {
        type: Array,
        default: []
    },
    meal: { type: Array, default: []},
    dayMenu: String, 
},
    {
        strict: false,
        timestamp: true
    }
)

module.exports = model('Menu', MenuSchema);