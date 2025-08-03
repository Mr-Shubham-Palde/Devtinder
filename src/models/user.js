const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 2,//minimum length of the frst name
        maxLength: 24//maximum length of the first name
    },

    lastname:
    {
        type: String,
        minLength: 2,//minimum length of the frst name
        maxLength: 24

    },
    emailid:
    {
        type: String,
        lowercase: true,
        required: true,
        unique: true,// what it will do is it will not allow the duplicate emails into the db,
        trim: true, // it will remove the spaces from the start and end of the email 
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please Enter the Valid Email" + value)
            }

        }
    },
    password:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Pleae Enter Strong Password:" + value)
            }
        }
    },
    age:
    {
        type: Number,
        min: 18//minimum age must be 18 for devtinder


    },
    gender:
    {
        type: String,
        enum:{
            values:['male',"female","other"],
            message:'{VALUE} is not valid gender type'
        },
        // to check if the users gender is male femae or other
        //now listen than the validate will work only for new documents not in the case for the document that is present and we try to update it
        // validate(value) {
        //     if (!["male", "female", "other"].includes(value)) {
        //         throw new Error("Gender is not valid")

        //     }
        // }

    },
    photoUrl: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/07/88/67/21/360_F_788672190_maGwfDtey1ep9BqZsLO9f6LaUkIBMNt1.jpg",// deafult image if user does not provide any image
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Pleae Enter Strong Password:" + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String],//an array of strings
    },


},
    { timestamps: true })

userSchema.methods.getJWT = async function (){
    const user = this; // 'this' refers to the instance of the user document
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$2004",{expiresIn:"1d"});

    return token
}

userSchema.methods.validatepassoword = async function(passwordinputbyuser){
    const user = this;
    const passwordHash = this.password

    const isPasswordValid = await bcrypt.compare(passwordinputbyuser, passwordHash);
    return isPasswordValid;
}
const User = mongoose.model('User', userSchema)
module.exports = User;