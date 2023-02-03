const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')



// router.post('/register', (req, res) =>{ 
//     // res.send(`Hello world from the server rotuer js`);
//     res.json({message:req.body})
//     console.log(req.body)
// }
// );

router.post('/register', async (req, res) => {
    const { fname, lname, email, rollno, password, cpassword } = req.body;

    if (!fname || !lname || !email || !rollno || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the field properly" })
    }

    try {
        const userExist = await User.findOne({ email: email })
        console.log(userExist)

        if (userExist) {
            console.log("email already exist")
            return res.status(422).json({ error: "Email already Exist" });
        }
        else if (password != cpassword) {
            res.status(422).json({ error: "passwords are not matching" })

        }
        else {
            const user = new User({ fname, lname, email, rollno, password, cpassword });

            // middlare works here

            await user.save();


            res.status(201).json({ message: "user registered successfully" })

        }


    }

    catch (err) {
        console.log(err)
    }
    // res.send("mera register page");
    // res.json({ message: req.body })
    console.log(req.body)
});

//signin route
router.post('/signin', async (req, res) => { let token;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "plz fill the credentials" })
        }


        const userLogin = await User.findOne({ email: email })

        if (userLogin) {
            // console.log(userLogin);
            const isbMatch = await bcrypt.compare(password, userLogin.password);
            const isMatch = await User.findOne({ password: password });

             
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires  : new Date(Date.now() + 9999999),
                httpOnly : true,
                secure:false,
                domain:localhost,
                path:'/'
              },
              );


            if (!isbMatch && !isMatch) {
                res.status(400).json({ error: "invalid credentials" })
            }
            else {
                res.json({ message: "signin succesfully" })
            }
        }
        else {
            res.status(400).json({ error: 'invalid credential' })
        }
    }
    catch (err) {
        console.log(err);
    }
})

//about us
router.get('/about',authenticate, (req,res)=>{
    console.log('Hello my About');
    res.send(req.rootUser);
})

router.get('/img',(req,res)=>{
    res.json({
        name: 'skjlf',
        data: 12,
        img:'https://www.freepnglogos.com/uploads/amazon-png-logo-vector/amazon-png-logo-vector-1.png'
    })
})


module.exports = router;