const express = require('express');

const { adminauth, userauth } = require('./middleware/auth');

const connectDB = require("./config/database");

const User = require('./models/user')
const { validateSignUpData } = require('./utils/validator')
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json())

//Signing up into the system
app.post("/signup", async (req, res) => {
    // what must be the flow 1. validateion of data 2.encrypting the passowrd 3. creating an instance od the user model
    try {

        //1.Validation of the data
        validateSignUpData(req);

        //2.Encrypting the password for this make the use of package called as bcrypt
        const {firstname,lastname,emailid,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        

        //save the user with the encrypted password
        const user = new User({firstname,lastname,emailid,password: passwordHash});

        await user.save();
        res.status(200).send("User Added Successfully");
    } catch (error) {
        console.error("Signup Error:", error); // <-- log the actual issue
        res.status(400).send("Error :"+ err.message);
    }
});

//login the user into the system
app.post("/login",async(req,res)=>{
    try {
        const {emailid,password} = req.body;

        if (!emailid || !password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        // if(!validator.isEmail(emailid)){
        //     throw new Error("Please Enter the valid email id")
        // }

        const user = await User.findOne({emailid:emailid})
        if(!user){
            throw new Error("Invalid credentails")
        }
        
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            res.send("User Login Successful")
        }
        else{
            throw new Error("invalid credentails")
        }

    }  catch (error) {
        console.error("Signup Error:", error); // <-- log the actual issue
        res.status(400).send("Error while Login the user");
    }
})


//get user by email id
app.get("/user", async (req, res) => {
    const email = req.body.emailid
    try {

        const Users = await User.findOne({ emailid: email })
        if (Users.length === 0) {
            res.status(400).send("User Not Exists")
        }
        else {
            res.send(Users)
        }

    } catch (error) {
        res.status(400).send("User Not fnd")
    }
})


//write an api to get the data of all the users
app.get("/feed", async (req, res) => {
    {
        try {

            const users = await User.find();
            res.send(users);

        } catch (error) {
            res.status(400).send("User not found")
        }
    }
})

app.delete("/deleteuser", async (req, res) => {
    const userid = req.body.userid;
    try {
        const user = await User.findByIdAndDelete(userid);
        res.send("User deleted successfully")
    } catch (error) {
        res.status(400).send("User not found or cnnot be deleted")

    }
})

//update the data of the user

app.patch("/update", async (req, res) => {

    const userid = req.body.userid;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["userid", "photoUrl", "about", "gender", "age", "skills"]

        const isupdatedallowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))

        if (!isupdatedallowed) {
            throw new Error("Update Not allowed")
        }

        const user = await User.findByIdAndUpdate({ _id: userid }, data, { runValidators: true })
        //runvalidators:true will allow us to make the changes in the existing document means it allows the validator function to be run
        res.send("User Updated Successfully")

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(400).send("User not found or cannot be updated")
    }

})

connectDB().then(() => {
    console.log("Connection established with mongodb")
    app.listen(3000, () => {
        console.log("Server is Listening at port 3000")
    })
}).catch((err) => {
    console.error("Database cannot be connected")
})


