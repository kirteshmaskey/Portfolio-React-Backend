const express = require("express");
const router = new express.Router();
const feedback = require("../models/feedbackSchema");
const dbProjects = require("../models/projectSchema");
const nodemailer = require("nodemailer");

//email config
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


// register user datails
router.post("/register", async(req, res)=> {
    const {firstName, lastName, email, phone, message} = req.body;
    // console.log(req.body);
    if(!firstName || !lastName || !email || !phone || !message) {
        res.status(401).json({status:401, error:"All input required"});
    }

    try {
        const preuser = await feedback.findOne({email: email});

        if(preuser) {
            const userFeedback = await preuser.Messagesave(message);
            console.log(userFeedback);

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Thanks for your feedback",
                text: `Thank you ${firstName} for you valuable feedback.`
            }

            transporter.sendMail(mailOptions, (error, info)=> {
                if(error) {
                    console.log("Error sending mail::  " + error);
                }else {
                    console.log("Email sent successfully" + info.response);
                    res.status(201).json({status:201, message:"Email sent successfully"})
                }
            });
        }else {
            const newUser = new feedback({
                firstName, lastName, email, phone, messages:{message: message}
            });

            const storeData = await newUser.save();
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Thanks for your feedback",
                text: `Thank you ${firstName} for you valuable feedback.`
            }

            transporter.sendMail(mailOptions, (error, info)=> {
                if(error) {
                    console.log("Error sending mail::  " + error);
                }else {
                    console.log("Email sent successfully" + info.response);
                    res.status(201).json({status:201, message:"Email sent successfully"})
                }
            });
            res.status(201).json({status:201, storeData})
        }
    } catch(error) {
        console.log("catch error" + error)
    }
})


//to get project details from database
router.get("/getProjects",async(req, res)=>{
    try {
        const projects = await dbProjects.find();
        res.status(201).json(projects);
        // res.status(200).json(projects);
        console.log(projects);
    } catch(error) {
        res.status(422).json(error);
    }
})

module.exports = router;