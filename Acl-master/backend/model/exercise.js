const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
      Name: {
        type: String
      },
      QuestionCorrect: {
        type:[String],
      },
      QuestionTitles: {
        type: [String]
      },
      QuestionChoices: {
        type: [[String]],
      },
      CourseId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Course'
      },
      usersScore:{
        type:[{username:String,score:Number}],
        required:false
      }
})  

const exercise = mongoose.model('exercise', exerciseSchema);
module.exports = exercise; 