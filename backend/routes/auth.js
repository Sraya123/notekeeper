const express =  require('express');
const router = express.Router();
//sending req body data to moongose model which acts as a layer to export data directly to mongodB
const User = require('../models/User');


//Create a User data using: POST(create/update) "/api/auth/". Doesn't require Authentication and the result will show on 3000/api/auth as JSON format
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body)
})

module.exports = router