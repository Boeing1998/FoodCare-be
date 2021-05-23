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
    dayMenu: { type: Date, default: Date.now }
},
    {
        strict: false,
        timestamp: true
    }
)

module.exports = model('Menu', MenuSchema);