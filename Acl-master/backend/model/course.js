const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  Name: {
    type: String,
    required: [true ,'Please add a password'],
  },
  Title: {
    type: String,
    required: [true ,'Please add a Password']
  },
  Rating:{
    type: Number,
    required: [true ,'Please add the required data']
  },
  Price: {
    type: Number,
    required: [true ,'Please add a Password']
  },
  Subject:{
    type: String,
    required: [true ,'Please add the required data']
  },
  Instructor:{
    type: String,
    required: [true ,'Please add the required data']
  },
  CourseSubtitles:{
    type: String,
    required: [true ,'Please add the required data']
  },
  Exercises:{
    type: String,
    required: [true ,'Please add the required data']
  },
  TotalHoursOfEachSubtitle:{
    type: Number,
    required: [true ,'Please add the required data']
  },
  ShortSummaryAboutCourse:{
    type: String,
    required: [true ,'Please add the required data']
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;