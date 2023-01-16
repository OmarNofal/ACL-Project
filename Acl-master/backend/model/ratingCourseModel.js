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
        type: String
      },
    ReviewerUsername:{
        type: String
      }
}, {timestamps: true });



const RatingCourse = mongoose.model('ratingCourse', ratingSchema);
module.exports = RatingCourse;