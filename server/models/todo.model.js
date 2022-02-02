const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Todo Schema
const todoSchema = new Schema({
    text:{
        type: String,  
        required: true,
    },
    done:{
        type: Boolean,
    }
});

module.exports = mongoose.model("Todo", todoSchema);