const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExerciseSchema = new Schema({
      Name: {
        type: String
      },

      Questions: [QuestionSchema],

      CourseId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Course'
      }
})  


const QuestionSchema = new mongoose.Schema( {

  Title: String,

  Choices: [String], // only 4 choices available

  CorrectChoiceIndex: Number // 0 - 3

} )

module.exports = ExerciseSchema;