const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    Username: 
    {
        type: String,
        
    },

    Title: 
    {
        type: String,
    },

    Type:
    {
        type:String,
        
    },

    Description:
    {
        type:String,
    },

    Status:
    {
        type:String,
        default:'unseen'
    },

    FollowUp:
    {
        type:[String],
        
    }

}, { timestamps: true });


const Report = mongoose.model('Report', reportSchema);
module.exports = Report