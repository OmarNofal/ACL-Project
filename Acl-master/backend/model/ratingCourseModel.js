const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    RatingGiven:{
        type:Number,
        required:true
    },
    Review:{
        type:String,
        required:false
    },
    CourseTitle:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Course'
      },
    ReviewerUsername:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
      }
}, {timestamps: true });



const RatingCourse = mongoose.model('ratingCourse', ratingSchema);
module.exports = RatingCourse;