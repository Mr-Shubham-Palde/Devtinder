const express = require('express');
const requestRouter = express.Router();
const { userauth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userauth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;

        // Check if target user exists
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(400).json({ error: "User not found" });  // ✅ fixed message
        }
        if(toUserId === fromUserId.toString()) {
            return res.status(400).json({ error: "You cannot send a connection request to yourself" });  // ✅ fixed message
        }

        const status = req.params.status.toLowerCase();  // ✅ normalize status

        // Validate status
        const allowedStatus = ['ignored', 'interested'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ error: "Invalid status provided" });
        }

        // Prevent duplicate connection request (both directions)
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).json({ error: "Connection request already exists" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message:req.user.firstname + ' is '+ status +' in '+toUser.firstname  ,
            data
        });

    } catch (error) {
        console.error("Error in sending interested request:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});



module.exports = requestRouter;
