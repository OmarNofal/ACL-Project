const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({

  Title: {
    type: String,
    //required: [true ,'Please add a title']
  },
  Rating:{
    type: Number,
    //required: [true ,'Please add the required data']
  },
  Price: { // we will assume price is in USD
    type: Number,
    //required: [true ,'Please add a Password']
  },
  Subject:{
    type: String,
    //required: [true ,'Please add the required data']
  },
  Instructor:{
    type: String,
    //required: [true ,'Please add the required data']
  },
  
  Subtitles:{
    type: [{Name: String, LengthMins: Number}],
    //required: [true ,'Please add the required data']
  },
  Exercises:{
    type: [{Name: String, Type: String, LengthMins: Number}],
    //required: [true ,'Please add the required data']
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
  }

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;