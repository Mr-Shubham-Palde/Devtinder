const express = require('express');

const profileRouter = express.Router()

const { userauth} = require('../middleware/auth')

profileRouter.get("/profile", userauth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }

        res.send(user);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(400).json({ error: "Invalid Token or Other Error" });
    }
});

module.exports = profileRouter;