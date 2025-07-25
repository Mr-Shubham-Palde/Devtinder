const express = require('express');

const profileRouter = express.Router()

const { userauth} = require('../middleware/auth')
const {  validateEditProfileData } = require('../utils/validator')   

profileRouter.get("/profile/view", userauth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        res.send(user);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(400).json({ error: "Invalid Token or Other Error" });
    }
});


profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error ("Invalid Edit Request" )
        }

        const loggedinuser = req.user;
        
        

        Object.keys(req.body).forEach(k=>{
            loggedinuser[k] = req.body[k]
        })
        await loggedinuser.save();

        res.json({message:"Profile Updated Successfully", user: loggedinuser});

        
    } catch (error) {
        console.error("Profile Edit Error:", error); // <-- log the actual issue
        res.status(400).send("Error while editing the profile");
        
    }
})

module.exports = profileRouter;