const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingInstructorSchema = new Schema({
    RatingGiven:{
        type:Number,
        required:true
    },
    Review:{
        type:String,
        required:false
    },
    InstructorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
      },
    UserReviewerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
      }
}, {timestamps: true });



const RatingInstructor = mongoose.model('ratingInstructor', ratingInstructorSchema);
module.exports = RatingInstructor;