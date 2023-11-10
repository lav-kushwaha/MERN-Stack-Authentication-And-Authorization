const mongoose = require('mongoose');

//Schema
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"visitor"
    }
})

//Model
const UserModel = new mongoose.model('users',UserSchema);

module.exports = UserModel;