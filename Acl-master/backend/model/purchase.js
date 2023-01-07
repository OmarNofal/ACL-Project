

const Schema = require('mongoose').Schema;
const model = require('mongoose').model;




const PurchaseSchema = new Schema({

    DateOfPurchase: Date,
    Username: String,
    InstructorName: String,
    CourseTitle: String,
    IsConfirmed: Boolean, // whether the user actually paid or not
    StripeId: String,
    PurchaseAmount: Number
})

const Purchase = model('Purchase', PurchaseSchema);
module.exports = Purchase;