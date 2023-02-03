const mongoose = require('mongoose');

// const DB = process.env.DATABASE;
const DB='mongodb+srv://owais:owais@ansari@cluster0.cey4jmv.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
    console.log(`connnection successful`);
}).catch((err)=>
console.log("connection failed"+err))
