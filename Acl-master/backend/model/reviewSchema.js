const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ReviewSchema = new Schema( {
    UserId: mongoose.Types.ObjectId,
    Username: String,
    Review: String,
    RatingGiven: Number,
    Timestamp: Number
} );

module.exports = ReviewSchema;