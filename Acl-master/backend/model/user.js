const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: {
    type: String,
    required: [true ,'Please add a password'],
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
    required: [true ,'Please add the required data']
  },
  FirstName:{
    type: String,
    
  },
  LastName:{
    type: String,
    
  },
  Gender:{
    type: String,
    
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;