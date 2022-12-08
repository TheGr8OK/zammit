const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const adminTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, "AdminToken required"]
    },
}, { timestamps: true });

module.exports = mongoose.model('AdminToken', adminTokenSchema);