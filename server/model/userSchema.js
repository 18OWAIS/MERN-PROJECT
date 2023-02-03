const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongooose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }

    ]

})

// middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);

    }
    next();
});

//we are generating token here
userSchema.methods.generateAuthToken= async function(){

    try{
        //generating tokens.. IN secret key minimum 32 characters are required.. process.env.SECRET_KEY is known as payload 
        // let tokenOwais=jwt.sign(JSON.stringify(this.fname), process.env.SECRET_KEY);
        
        // let tokenOwais=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        
        //adding token to tokens's token field
        // if(this.tokens=this.tokens.concat({token:tokenOwais}))
        this.tokens=this.tokens.concat({token:token})
        if(this.tokens=this.tokens.concat({token:token}))
        {
            console.log("yes token is there")
        }
        
        await this.save();
        
        console.log(this.tokens)

        //for saving token

        // return this.tokens;
        return token;
        
    }
     catch(err){
        console.log(err)
    }

}



const User = mongooose.model('users', userSchema);

module.exports = User;