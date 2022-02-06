const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'verypowerfullString$itis%';
const fetchuser = require('../middleware/fetchuser');

//Router 1: router for /api/auth/createuser login not require
router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Name shuld be more than 4 char').isLength({ min: 4 }),
    body('password', 'enter a strong Password password shuld be more than 8 char').isLength({ min: 8 })], async (req, res) => {
        //checking validation for email , name , password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //ckecking the email alrady exist or not 
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: `Sorry ${req.body.email} alrady exist` });
            }
            //password hassing and salt into password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //adding user data into database 
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });
            //craeting a json token and send the token to the user
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        } catch (error) {
            console.log(error);
            res.status(500).send("Some error occured");
        }
    }
);

//Router 2:  Router for api/auth/login login not require
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').notEmpty()
], async (req, res) => {
    //Checking email is valid or not and password is blank or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //checking email is alrady exist or not 
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "Please enter a valid credentials to login" });
        }

        //compare password with hassing 
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter a valid credentials to login" });
        }

        //if password and email id matches then send token id 
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (error) {
        res.status(500).send('Some internal server error occured');
        console.log(error)
    }
});


//Router 3: Router for api/auth/getuser Login require
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send('Some internal server error occured');
        console.log(error)
    }
});

module.exports = router;