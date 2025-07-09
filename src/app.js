const express = require('express');
const { adminauth, userauth } = require('./middleware/auth');

const app = express();

// now we will work on the middleware

//why we need a middleware is to check if the user is authenticated or not or to handle the requests
// handle auth middleware for all GET POST PUT DELETE requests
app.use("/admin",adminauth)
app.use("/user",userauth)

app.get("/admin/getalldata",(req,res)=>{
    //check if request is authentication
    //logic of checking if the user is authenticated
    res.send("All data send")
    
   
})
app.get("/user/getalldata",(req,res)=>{
    //check if request is authentication
    //logic of checking if the use ris authenticated
    res.send("All data send")
    
   
})
app.get("/admin/deleteuser",(req,res)=>{
    
    res.send("delete the user")
})





app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})