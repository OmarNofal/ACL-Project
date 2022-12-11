const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: {
    type: String,
    required: [true ,'Please add a Username'],
  },
  Password: {
    type: String,
    required: [true ,'Please add a Password']
  },
  Type:{
    type: String,
    required: [true ,'Please add the required data']
  },
  Email:{
    type: String,
    required: [true ,'Please add the required data'],
    // unique:true,
    // sparse:true,
    // index:true,

  },
  FirstName:{
    type: String,
    
  },
  LastName:{
    type: String,
    
  },
  Gender:{
    type: String,
    required: [true ,'Please add the required data']
  },
  // Rating:{
  //   type: [{score: Number, count: Number, sumSoFar:Number, }],
  //   required: false
  // },
  Rating:{
    type: {Rating: Number, Count: Number},
    required: false
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
  Reviews:{
    type: [String],
    //required: [true ,'Please add the required data']
  }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User