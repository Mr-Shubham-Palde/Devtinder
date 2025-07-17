const mongoose = require('mongoose');
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstname:{type:String,required:true,
        minLength:2,//minimum length of the frst name
        maxLength:24//maximau length of the first name
    },

    lastname:
    {
        type:String,
        
    },
    emailid:
    {
        type:String,
        lowercase:true,
        required:true,
        unique:true,// what it will do is it will not allow the duplicate emails into the db,
        trim:true, // it will remove the spaces from the start and end of the email 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter the Valid Email" + value)
            }

        }
    },
    password:
    {
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Pleae Enter Strong Password:"+ value)
            }
        }
    },
    age:
    {
        type:Number,
        min:18//minimum age must be 18 for devtinder
        
        
    },
    gender :
    {
        type:String,
        // to check if the users gender is male femae or other
        //now listen than the validate will work only for new documents not in the case for the document that is present and we try to update it
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender is not valid")

            }
        }
        
    },
    photoUrl:{
        type:String,
         default:"https://t4.ftcdn.net/jpg/07/88/67/21/360_F_788672190_maGwfDtey1ep9BqZsLO9f6LaUkIBMNt1.jpg",// deafult image if user does not provide any image
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Pleae Enter Strong Password:"+ value)
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String],//an array of strings
    },
    

},
{timestamps:true})
const User = mongoose.model('User',userSchema)
module.exports = User;