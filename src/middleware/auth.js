const jwt = require('jsonwebtoken')
const User = require("../models/user")
const userauth = async (req, res, next) => {
    //read the token from the req cookies
    try {
        const { token } = req.cookies;
        if(!token){
            throw new Error("Token is not valid")
        }
        //validate the token 
        const decodedToken = await jwt.verify(token, "DEV@Tinder$2004")


        //find the username
        const { _id } = decodedToken;
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("user not found")
        }
        req.user = user
        next();
    }
    catch (err) {
        console.error("Authentication Error:", err);
        res.status(400).json({ error: "Access Denied. Invalid token." });
    }
}


module.exports = {
    userauth
}