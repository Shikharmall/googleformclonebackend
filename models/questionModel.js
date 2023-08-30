const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    open:{
        type:String,
        required:true
    },
    formno:{
        type:String,
        required:true
    },
    heading:{
        type:String
    },
    type:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    option0:{
        type:String,
    },
    option1:{
        type:String,
    },
    option2:{
        type:String,
    },
    option3:{
        type:String,
    },
    option4:{
        type:String,
    },
    option5:{
        type:String,
    },
    option6:{
        type:String,
    },
    option7:{
        type:String,
    },
    option8:{
        type:String,
    },
    option9:{
        type:String,
    }
    
},

{ timestamps:true }

);

module.exports = mongoose.model('Question',questionSchema);