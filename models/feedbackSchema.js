const mongoose = require("mongoose");
const validator = require("validator");

const feedbackSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {   // npm i validator
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    phone: {
        type: String,
        required: true,
    },
    messages:[]
    // message: {
    //     type: String,
    //     required: true
    // }
})

//Save multiple message
feedbackSchema.methods.Messagesave = async function(message) {
    try {
        this.messages = this.messages.concat(message);
        await this.save();
        return message;
    } catch (error) {
        console.log(error);
    }
}


// create model

const feedback = new mongoose.model("feedback", feedbackSchema);

module.exports = feedback;

