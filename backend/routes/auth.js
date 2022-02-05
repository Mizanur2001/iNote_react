const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Name shuld be more than 4 char').isLength({ min: 4 }),
    body('password', 'enter a strong Password password shuld be more than 8 char').isLength({ min: 8 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: `Sorry ${req.body.email} alrady exist` });
            }
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            res.json({ Success: `Hey ${req.body.name} ! you Accunt created Successfully`, user });
        } catch (error) {
            console.log(error);
            res.status(500).send("Some error occyred");
        }
    });

module.exports = router;