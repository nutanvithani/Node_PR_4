const mongoose = require('mongoose')

const connect=async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/book_Store")
    console.log("database is connected");
}
module.exports=connect