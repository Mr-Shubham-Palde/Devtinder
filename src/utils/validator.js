const validator =  require("validator")

const validateSignUpData = (req)=>{
    const {firstname,lastname,emailid,password} = req.body;
    if(!firstname || !lastname){
        throw new Error ("Name is not defined")
    }
    else if (!validator.isEmail(emailid)){
        throw new Error ("Please Enter a valid Email")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error ("Please Enter a Strong Password")
    }
}

const validateEditProfileData = (req)=>{
     const allowEditFields = ["firstname","lastname","emailid","photoUrl","about","gender","age","skills"];

     const isEditAllowed = Object.keys(req.body).every(k=>allowEditFields.includes(k))

    return isEditAllowed
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}