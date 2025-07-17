const validator =  require("validator")

const validateSignUpData = (req)=>{
    const {firstname,lastname,emailid,password} = req.body;
    if(!firstname || !lastname){
        throw new Error("Name is not defined")
    }
    else if (!validator.isEmail(emailid)){
        throw new Error("Please Enter a valid Email")
    }
    else if (!validator.isStrongPassword(emailid)){
        throw new Error("Please Enter a Strong Password")
    }
}