const adminauth = (req,res,next)=>{
    const token = "xyz";
    const isAuthenticated = token ==="xyz"
    if (isAuthenticated){
        next();
    }
    else{
        res.status(401).send("Unauthorized access");
    }
}
const userauth = (req,res,next)=>{
    const token = "xyz";
    const isAuthenticated = token ==="xyz"
    if (isAuthenticated){
        next();
    }
    else{
        res.status(401).send("Unauthorized access");
    }
}


module.exports= {
    adminauth,userauth
}