const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Todo Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    isLogged:{
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model("User", userSchema);