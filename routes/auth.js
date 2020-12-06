const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register' , async (req , res) =>{
    const emailExist = await User.findOne({email: req.query.email});
    if(emailExist){
        return res.status(400).send('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.query.password , salt);

    const user = new User({
        name: req.query.name,
        email: req.query.email,
        password: hashPass,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login' , async (req , res) =>{
    const user = await User.findOne({email: req.query.email});
    if(!user){
        return res.status(400).send('Email or password is wrong');
    }
    const validPass = await bcrypt.compare(req.query.password , user.password);
    if(!validPass){
        return res.status(400).send('Email or password is wrong');
    }

    const token = jwt.sign({_id: user._id} , process.env.TOKEN_SECRET);
    res.header('auth-token' , token).send(token);
    res.send("Login success");
})


module.exports = router;