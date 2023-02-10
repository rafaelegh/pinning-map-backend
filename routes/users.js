const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req, res) => {
    try {
        //generate new password
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and response
        const user = await newUser.save();
        res.status(200).json(user._id);

    } catch (error) {
        res.status(500).json(error);
    }
});

//get all pins

router.post('/login', async (req, res) => {
    try {
        //find user
        const userFound = await User.findOne({username: req.body.username});
        !userFound && res.status(400).json("Wrong username or password!");

        //validate password
        const validPassword = await bcrypt.compare(
            req.body.password,
            userFound.password
        );
        !validPassword && res.status(400).json("Wrong username or password!");

        //send res
        res.status(200).json({ _id: userFound._id, username: userFound.username });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;