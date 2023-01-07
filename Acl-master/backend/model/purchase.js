

const Schema = require('mongoose').Schema;
const model = require('mongoose').model;




const PurchaseSchema = new Schema({

    DateOfPurchase: Date,
    Username: String,
    InstructorName: String,
    CourseTitle: String,
    IsConfirmed: Boolean, // whether the user actually paid or not
    StripeId: String,
    TotalPaid: Number, // the money the user paid, including the commission which will be deducted
    TotalCommission: Number, // money deducted from TotalPaid and goes to us
    
})

const Purchase = model('Purchase', PurchaseSchema);
module.exports = Purchase;