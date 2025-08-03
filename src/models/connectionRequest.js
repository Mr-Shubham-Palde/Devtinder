//  this connection request will define the request schema and the logic for sending connection requests
const mongoose = require('mongoose');   


const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message:"{VALUE} is not a valid status"
        },
        required:true
    }
},{
    timestamps:true
})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this
    //check if grom and to user are same
    // we cannot directly compare the ids as they are of type ObjectId
    // so we will convert them to string and then compare
    if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()){
        throw new Error("You cannot send a connection request to yourself")
    }
    next();
})

const ConnectionRequest = new  mongoose.model("ConnectionRequest", connectionRequestSchema);


module.exports = ConnectionRequest;
// this will export the connection request model so that we can use it in other files