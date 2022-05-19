    const mongoose = require('mongoose')

const model = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const model2 = new mongoose.Schema({
        CLIENTNUM: Number,
        Attrition_Flag: String,
        Customer_Age:Number,
        Gender: String,
        Education_Level: String,
        Marital_Status: String, 
        Income_Category: String,
        Card_Category: String,
        Months_on_book: Number,
        Months_Inactive_12_mon: Number,
        Credit_Limit: Number
});

// Creating model objects
const User = mongoose.model('User', model);
const Client = mongoose.model('Client', model2);

// Exporting our model objects
module.exports = {
    User, Client
}