const mongoose = require('mongoose')

const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://kbtug22004:shubham2004@devtinder.tscacqs.mongodb.net/Namastetinder');
}


module.exports = connectDB
