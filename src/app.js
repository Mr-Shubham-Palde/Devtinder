const express = require('express');

const { adminauth, userauth } = require('./middleware/auth');

const  connectDB =require("./config/database");

const User = require('./models/user')

const app = express();

app.post("/signup",async(req,res)=>{
    const userobj = {
        firstname:"Virat",
        lastname:"Kohli",
        emailid:"virate2004@gmail.com",
        password:"shubham123",
        age:21,
        gender:"Male"
    }
    //creating a new instance of the User model and passing the user object
    const user = new User(userobj);
    await user.save();

    res.send("User Added Successfully")

})


connectDB().then(()=>{
    console.log("Connection established with mongodb")
    app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})
}).catch((err)=>{
    console.error("Database cannot be connected")
})


