const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RatingSchema = new Schema( {
    Score: Number, // Score from 0 to 5
    SumSoFar: Number,
    ReviewCounts: Number
})


module.exports = RatingSchema;
