const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    Name: {
        type: String,
        required: [true, "Admin name required"],
        unique: [true, "Admin name already in use"]
    },
    Password: {
        type: String,
        required: [true, "Admin password required"]
    },
    Role: {
        type: String,
        required: [true, "Role required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);