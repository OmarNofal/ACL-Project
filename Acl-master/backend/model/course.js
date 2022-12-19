const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = require('./ratingSchema');
const ExerciseSchema = require('./exercise');
const ReviewSchema = require('./reviewSchema');
const SubtitleSchema = Schema({
  Name: String, 
  LengthMins: Number,
  VideoURL: String,
  VideoDescription: String
});


const CourseSchema = new Schema({

  Title: {
    type: String
  },

  Rating: RatingSchema,

  Price: Number, // USD

  Reviews: [ReviewSchema],

  Subject: String,

  Instructor: {
    type: String,
    required: true,
    ref:'User'
  },
  
  Subtitles: [SubtitleSchema],

  Exercises: [ExerciseSchema],

  Summary: String,

  Hours: Number,

  // in percentage from 0 to 1
  DiscountPercentage: Number,

  DiscountDeadline: Date,

  Show: String,

  // Youtube Video url for the course preview
  PreviewVideoURL: String

}, { timestamps: true });




const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;