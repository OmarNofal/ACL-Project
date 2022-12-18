const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new mongoose.Schema( {

  Title: String,

  Choices: [String], // only 4 choices available

  CorrectChoiceIndex: Number // 0 - 3

} )

const ExerciseSchema = new Schema({
      Name: {
        type: String
      },

      

      CourseTitle:{
        type: String,
        
        ref:'Course'
      }
})  




module.exports = ExerciseSchema;