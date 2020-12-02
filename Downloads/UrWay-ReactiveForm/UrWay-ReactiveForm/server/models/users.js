let mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

let userModel = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    dateCreated: Date,
    contact: Number,   
},
{
    collection: "users"
});
userModel.plugin(uniqueValidator);
module.exports = mongoose.model('User', userModel);
