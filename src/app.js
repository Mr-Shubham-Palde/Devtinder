const express = require('express');

const { adminauth, userauth } = require('./middleware/auth');

const  connectDB =require("./config/database");

const User = require('./models/user')

const app = express();
app.use(express.json())

app.post("/signup", async (req, res) => {
    const userobj = req.body;
    const user = new User(userobj);
    

    try {
        await user.save();
        res.status(200).send("User Added Successfully");
    } catch (error) {
        console.error("Signup Error:", error); // <-- log the actual issue
        res.status(400).send("Error while creating user");
    }
});

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
        const ALLOWED_UPDATES = ["userid","photoUrl","about","gender","age","skills"]

        const isupdatedallowed = Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k))
    
        if (!isupdatedallowed){
        throw new Error("Update Not allowed")
        }

        const user = await User.findByIdAndUpdate({_id:userid},data,{runValidators:true})
        //runvalidators:true will allow us to make the changes in the existing document means it allows the validator function to be run
        res.send("User Updated Successfully")
        
    } catch (error) {
        console.error("Signup Error:", error);
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


