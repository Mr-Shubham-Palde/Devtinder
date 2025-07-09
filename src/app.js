const express = require('express');

const app = express();
app.use("/about",(req,res)=>{
    res.send("This is about route handler");
})
app.use("/about/contact",(req,res)=>{
    res.send("This is contact route handler");
}       )
// app.use("/",(req,res)=>{
//     console.log("This is my first request");
//     res.send("Hello World")
// })
app.get("/user",(req,res)=>{
    res.send("This is user route handler")
})





app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})