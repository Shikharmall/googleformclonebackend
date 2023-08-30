const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    formno:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
    
},

{ timestamps:true }

);

module.exports = mongoose.model('Answer',answerSchema);