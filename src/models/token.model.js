const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
    {
        token: String,
        // name: String,
        expire_at: {type: Date, default: Date.now, expires: 604800} 
    },{
        timestamp: true
    }
);
// tokenSchema.index({createdAt: 1},{expireAfterSeconds: 0});
module.exports = model('Token', tokenSchema);
// 7 day = 604800