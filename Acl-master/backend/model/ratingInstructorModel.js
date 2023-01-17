const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingInstructorSchema = new Schema({
    RatingGiven:{
        type:Number
    },
    Review:{
        type:String
    },
    InstructorName:{
        type: String
      },
    ReviewerUsername:{
        type: String
      }
}, {timestamps: true });



const RatingInstructor = mongoose.model('ratingInstructor', ratingInstructorSchema);
module.exports = RatingInstructor;