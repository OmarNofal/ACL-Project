const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  Title: {
    type: String,
    //required: [true ,'Please add a title']
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
    type: [{Language: String, LengthMins: Number}],
    //required: [true ,'Please add the required data']
  },
  Exercises:{
    type: [{Name: String, Type: String, LengthMins: Number}],
    //required: [true ,'Please add the required data']
  },
  Summary:{
    type: String,
    //required: [true ,'Please add the required data']
  }

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;