const express = require('express');

const requestRouter = express.Router();
const { userauth} = require('../middleware/auth')

requestRouter.post("/sendConnectionRequest", userauth, async (req, res) => {

    const user = req.user;
    console.log("Connection Request send")
    res.send(user.firstname + " " + user.lastname + " has sent you a connection request ")
})

module.exports = requestRouter;
