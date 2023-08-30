const express = require('express');
const app = express();

require('dotenv').config();

const port =  process.env.PORT || 8000;

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE);


mongoose.connection.on('error',err=>{
   console.log("Connection Failed");
});

mongoose.connection.on('connected',connected=>{
   console.log("Connection with database..");
});


const cors = require('cors');

app.use(cors({
   credentials: true,
   origin:'*'
}));


const userRoute = require('./routes/tasksRoute');
app.use('/', userRoute);

app.listen(port);