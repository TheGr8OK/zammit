const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const moderatorSchema = new Schema({
    Name: {
        type: String,
        required: [true, "Moderator name required"]
    },
    Password: {
        type: String,
        required: [true, "Moderator password required"]
    },
    Role: {
        type: String,
        required: [true, "Role required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Moderator', moderatorSchema);