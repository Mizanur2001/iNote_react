const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'verypowerfullString$itis%'


router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Name shuld be more than 4 char').isLength({ min: 4 }),
    body('password', 'enter a strong Password password shuld be more than 8 char').isLength({ min: 8 })], async (req, res) => {
        const errors = validationResult(req);
        //checking validation for email , name , password
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
            res.status(500).send("Some error occyred");
        }
    });

module.exports = router;