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

//get user by email id
app.get("/user",async(req,res)=>{
    const email = req.body.emailid
    try {

        const Users = await User.findOne({emailid:email})
        if (Users.length === 0){
            res.status(400).send("User Not Exists")
        }
        else{
            res.send(Users)
        }
        
    } catch (error) {
        res.status(400).send("User Not fnd")
    }})


//write an api to get the data of all the users
app.get("/feed",async(req,res)=>{{
    try {

        const users = await User.find();
        res.send(users);
        
    } catch (error) {
        res.status(400).send("User not found")        
    }
}})

app.delete("/deleteuser",async(req,res)=>{
    const userid = req.body.userid;
    try {
        const user = await User.findByIdAndDelete(userid);
        res.send("User deleted successfully")
    } catch (error) {
        res.status(400).send("User not found or cnnot be deleted")
        
    }
})

//update the data of the user

app.patch("/update",async(req,res)=>{

    const userid = req.body.userid;
    const data = req.body;
    try {

        const user = await User.findByIdAndUpdate({_id:userid},data)
        res.send("User Updated Successfully")
        
    } catch (error) {
        res.status(400).send("User not found or cannot be updated")
    }

})

connectDB().then(()=>{
    console.log("Connection established with mongodb")
    app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})
}).catch((err)=>{
    console.error("Database cannot be connected")
})


