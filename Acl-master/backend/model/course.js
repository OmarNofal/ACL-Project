const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

  Title: {
    type: String
  },

  Score:{
    type:Number,
    default:0,
    required:false
  },

  Count:{
    type:Number,
    default:0,
    required:false
  },

  SumSoFar:{
    type:Number,
    default:0,
    required:false
  },
  
  Price: { // we will assume price is in USD
    type: Number,
    //required: [true ,'Please add a Password']
  },
  Reviews:{
    type: [String],
    //required: [true ,'Please add the required data']
  },
  Subject:{
    type: String,
    //required: [true ,'Please add the required data']
  },

  Instructor:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  
  Subtitles:{
    type: [
      {
        Name: String, 
        LengthMins: Number,
        VideoURL: String,
        VideoDescription: String
      }
    ],
    //required: [true ,'Please add the required data']
  },
  Exercises:{
    type: String    //required: [true ,'Please add the required data']
  },
  Summary:{
    type: String,
    //required: [true ,'Please add the required data']
  },
  Hours:{
    type:Number,
  },
  Discount:{
    type:Number,
  },
  Show:{
    type:String
  },
  PreviewVideoURL: {
    type: String
  }

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;