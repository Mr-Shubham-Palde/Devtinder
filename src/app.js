const express = require('express');

const app = express();
// why we use app.use()?
// app.use() is used to mount middleware functions at a specific path.

app.use('/user',(req,res)=>{
    //route handler for /user
    res.send("Route Handler for  1")
})




app.listen(3000,()=>{
    console.log("Server is Listening at port 3000")
})