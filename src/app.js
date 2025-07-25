const express = require('express');

const { userauth } = require('./middleware/auth');

const connectDB = require("./config/database");


const { validateSignUpData } = require('./utils/validator')
const bcrypt = require("bcrypt")

const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json())
app.use(cookieParser())



const authRouter = require('./routes/auth');
const requestRouter = require('./routes/requests');
const profileRouter = require('./routes/profile'); 


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)



connectDB().then(() => {
    console.log("Connection established with mongodb")
    app.listen(3000, () => {
        console.log("Server is Listening at port 3000")
    })
}).catch((err) => {
    console.error("Database cannot be connected")
})


