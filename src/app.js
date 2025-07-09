const express = require('express');

const app = express();

// now we will work on the middleware

app.use("/",(req,res,next)=>{
    console.log("1st route handler")
    //res.send("Hello From the server")
    next();

},(req,res,next)=>{
    console.log("This is 2nd route handler")
    //res.send("2nd router")
    next();

},
(req,res,next)=>{
    console.log("This is 3rd route handler")
    // res.send("3rd router")}
    next();
},

(req,res,next)=>{
    console.log("This is 4th route handler")
    res.send("4th router handler")}
    
)





app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})