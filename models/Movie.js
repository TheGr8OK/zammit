const mongoose = require('mongoose') 
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    Title: {
        type: String,
        required: [true, "Movie name required"],
        unique: [true, "Movie name already exists"]
    },
    Released: {
        type: String,
        required: [true, "Movie release date required"]
    },
    imgURL: {
        type: String,
        required: [true, "Movie image URL required"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);