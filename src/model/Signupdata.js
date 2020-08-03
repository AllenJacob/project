const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SignupDb');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    
    email : String,
    password : String
});

var Signupdata = mongoose.model('signup',NewUserSchema);

module.exports = Signupdata;