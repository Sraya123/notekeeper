const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
//sending req body data to moongose model which acts as a layer to export data directly to mongodB
const User = require('../models/User');

//importing bcryptjs
const bcrypt = require('bcryptjs');

//importing jwt token
var jwt = require('jsonwebtoken');

var secrt_token = 'shao@131';




//Create a User data using: POST(create) "/api/auth/createuser". Doesn't require Authentication and the result will show on 3000/api/auth as JSON format

router.post('/createuser',
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Enter a password of length 5').isLength({ min: 5 }),
    async (req, res) => {
        //if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "A user with this email already exists" });
        }
        //if it is new email then create a new user.
        //hash user password using bcryptjs
        const password = req.body.password;
        //returns a promise so await keyword is used to wait before the promise is returned
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        const data = {
            user:{
                id: user.id
            }
        }
        var authtoken = jwt.sign(data, secrt_token);
        res.json({authtoken});
        //.then(user => res.json(user))
        //.catch(err=> {console.log(err)
        //res.json({error: 'Please enter unique data', message: err.message})})

        //to see the response on thunderclient
        
    })

module.exports = router