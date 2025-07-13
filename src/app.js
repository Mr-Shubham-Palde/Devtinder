const express = require('express');

const { adminauth, userauth } = require('./middleware/auth');

const  connectDB =require("./config/database");

const User = require('./models/user')

const app = express();
app.use(express.json())

app.post("/signup",async(req,res)=>{
    const userobj = req.body;
    const user = new User(userobj);
    //creating a new instance of the User model and passing the user object
    try {
        
        await user.save();

        res.send("User Added Successfully")
        
    } catch (error) {
        console.error(err);
        res.status(400).send("Error while creating user")
        
    }

})

//write an api to get the data of all the users
app.get("/feed",async(req,res)=>{{
    try {

        const users = await User.find();
        res.send(users);
        
    } catch (error) {
        res.status(400).send("User not found")        
    }
}})


connectDB().then(()=>{
    console.log("Connection established with mongodb")
    app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})
}).catch((err)=>{
    console.error("Database cannot be connected")
})


