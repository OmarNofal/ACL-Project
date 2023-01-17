const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = require('./reviewSchema');
const RatingSchema = require('./ratingSchema')

const userSchema = new Schema({

  Username: String,

  Password: String,

  Type: String,

  Email: String,

  FirstName: String,

  LastName: String,

  Gender: String,

  Biography: String,

  Rating: RatingSchema,

  Reviews: [ReviewSchema],

  IsVerified: Boolean,

  VerificationHash: String,

  PasswordResetHash: String,

  Courses:{
    type:[{title:String,dataEnrolled:Date,purchasedFor:Number,progress:Number,notes:String}],
  },

  Wallet:{
    type:Number,
    default:0
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User