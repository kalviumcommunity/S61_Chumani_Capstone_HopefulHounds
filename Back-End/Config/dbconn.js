const mongoose = require('mongoose');
require('dotenv').config();
console.log('DATABASE_URI', process.env.DATABASE_URI);
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URI, {
            serverSelectionTimeoutMS: 30000,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`);
        // await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
        console.log("connectDB",err);
        process.exit(1);
    }
}
module.exports = connectDB;