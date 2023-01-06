const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refundRequestsSchema = new Schema({

    Username: 
    {
        type: String,
        
    },

    Title: 
    {
        type: String,
    },

    RefundedAmount:
    {
        type:Number
    }
}, { timestamps: true });


const RefundRequests = mongoose.model('RefundRequests', refundRequestsSchema);
module.exports = RefundRequests