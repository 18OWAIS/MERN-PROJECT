require('dotenv').config()
const mongoose = require('mongoose');

// const DB = process.env.DATABASE;
const DB=process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
    console.log(`connnection successful`);
}).catch((err)=>
console.log("connection failed"+err))
