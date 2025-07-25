const express = require('express')

const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validator')

const User = require('../models/user')

const bcrypt = require("bcrypt")


authRouter.post("/signup", async (req, res) => {
    // what must be the flow 1. validateion of data 2.encrypting the passowrd 3. creating an instance od the user model
    try {

        //1.Validation of the data
        validateSignUpData(req);

        //2.Encrypting the password for this make the use of package called as bcrypt
        const { firstname, lastname, emailid, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);


        //save the user with the encrypted password
        const user = new User({ firstname, lastname, emailid, password: passwordHash });

        await user.save();
        res.status(200).send("User Added Successfully");
    } catch (error) {
        console.error("Signup Error:", error); // <-- log the actual issue
        res.status(400).send("Error :" + err.message);
    }
});


authRouter.post("/login", async (req, res) => {
    try {
        const { emailid, password } = req.body;

        if (!emailid || !password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const user = await User.findOne({ emailid: emailid })
        if (!user) {
            throw new Error("Invalid credentails")
        }

        const isPasswordValid = await user.validatepassoword(password)

        if (isPasswordValid) {

            
            const token = await user.getJWT()
            res.cookie("token", token , {expires: new Date(Date.now() + 24 * 60 * 60 * 1000)})
            res.send("User Login Successful")
        }
        else {
            throw new Error("invalid credentails")
        }

    } catch (error) {
        console.error("Signup Error:", error); // <-- log the actual issue
        res.status(400).send("Error while Login the user");
    }
})

authRouter.post("/logout",async(req,res)=>{
    try {


        res.cookie("token",null,{expires:new Date(Date.now())}) 
        
        res.send("Logout Successfully")
        
    } catch (error) {
        console.error("Logout Error:", error); // <-- log the actual issue
        res.status(400).send("Error while Logging out the user");
        
    }
})


module.exports = authRouter;