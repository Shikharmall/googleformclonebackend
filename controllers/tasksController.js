const User = require('../models/userModel');
const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');

const cookieParser = require('cookie-parser');
const cookies = require('cookie');

const jwt = require('jsonwebtoken');


/* checking users login */

const checklogin = async(req,res)=>{

    try {

        const email = req.body.email;
        const password = req.body.password;

        const userchecked = await User.find({email:email,password:password});

        if(userchecked.length !== 0){

            const token = jwt.sign({ email: email }, 'your-secret-key', {
                expiresIn: '1h',
            });
            
            res.status(201).json({data:true,token:token,email:email});
        }
        else{
            res.status(201).json({data:false});
        }

    } catch (error) {
        console.log(error.message);
    }

}

/* adding questions of creator to databse */

const addquestion = async(req,res)=>{

    try {

        //let formfinaldataa = formData[0];
        //let headinggg = formfinaldataa["heading"];

        const email = "shmall.21.2020@gmail.com";

        const min = 1000000000; // Minimum 10-digit number
        const max = 9999999999; // Maximum 10-digit number
        const randomNum =  Math.floor(Math.random() * (max - min + 1)) + min;


        const formData = req.body;

        for(let i = 0 ; i < formData.length ; i++){

            let formfinaldata = formData[i];
            //formfinaldata["heading"] = headinggg;
            formfinaldata["formno"] = randomNum;
            formfinaldata["email"] = email;
            formfinaldata["open"] = true;
            const questionEntry = new Question(formfinaldata);
            await questionEntry.save();

        }

        res.status(201).json({ message: 'Data saved successfully',formno: randomNum});
    

      } catch (error) {
        res.status(500).json({ error: error });
      }

}

/* showing question on users page */

const getquestion = async(req,res)=>{

    try {

        const formno = req.query.formno;

        const question = await Question.find({formno:formno}).sort({_id:1});

        res.json(question);

    } catch (error) {
        console.log(error.message);
    }

}

/* adding users response */

const addanswer = async(req,res)=>{

    try {

        const formData = req.body;

        for(let i = 0 ; i < formData.length ; i++){

            let formfinaldata = formData[i];
            const questionEntry = new Answer(formfinaldata);
            await questionEntry.save();

        }

        res.status(201).json({ message: 'Data saved successfully'});
    

      } catch (error) {
        res.status(500).json({ error: error });
      }

}

/* check already submitted */

const checkalreadysubmitted = async(req,res)=>{

    try {

        const email = req.query.email;
        const formno = req.query.formno;

        const checkuser = await Answer.find({email:email,formno:formno}).sort({_id:1});

        if(checkuser.length !== 0){
            res.status(201).json({ data: true});
        }
        else{
            res.status(201).json({ data: false});
        }

      } catch (error) {
        res.status(500).json({ error: error });
      }

}


/* check form open */

const checkformopen = async(req,res)=>{

    try {

        const formno = req.query.formno;

        const checkform = await Question.find({formno:formno}).sort({_id:1});

        //console.log(checkform[0].open);

        if(checkform[0].open === "true"){
            res.status(201).json({ data: true});
        }
        else{
            res.status(201).json({ data: false});
        }

      } catch (error) {
        res.status(500).json({ error: error });
      }

}


/* get user response */

const getresponse = async(req,res)=>{

    try {

        const groupedData = await Answer.aggregate([

            {
                $group: {
                    //_id: "$formno",
                    _id:{
                        formno:"$formno",
                        heading:"$heading"
                    },
                    pooraDoc: {
                        $push: "$$ROOT"
                    }
                }
            },
            {
                $unwind: "$pooraDoc"
            },
            {
                $group: {
                    _id: {
                        formno: "$_id",
                        email: "$pooraDoc.email"
                    },
                    pooraDoc: {
                        $push: "$pooraDoc"
                    }
                }
            },
            {
                $group: {
                    _id: "$_id.formno",
                    emailGroups: {
                        $push: {
                            email: "$_id.email",
                            pooraDoc: "$pooraDoc"
                        }
                    }
                }
            }
            
        ]);

        res.json(groupedData);

      } catch (error) {
        res.status(500).json({ error: error });
      }

}



module.exports ={
    checklogin,
    addquestion,
    getquestion,
    checkalreadysubmitted,
    checkformopen,
    addanswer,
    getresponse
}