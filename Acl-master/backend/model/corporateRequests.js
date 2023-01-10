const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const corporateRequestSchema = new Schema({

    Username:{
        type:String
    },
    Title:{
        type:String
    }
})

const CorporateRequest = mongoose.model('CorporateRequest', corporateRequestSchema);
module.exports = CorporateRequest;